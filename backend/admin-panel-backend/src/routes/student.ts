import multer from 'multer';
import csv from 'csv-parser';
import { Readable } from 'stream';
import iconv from 'iconv-lite';
import { IController } from '../utils/icontroller';
import { ExtendedRequest, verifyToken } from '../middlewares/auth'
import express, { Response, Router } from "express";
import { generatePaginationLinks } from '../utils/helper'

import DB from '../utils/db-client'
import {
    isValidString,
    isValidPhoneNumber,
    isValidStudentNumber,
    isValidEmail,
    isValidArrayId,
    isValidId
} from '../utils/validate'
import process from "node:process";
import { stringify } from 'csv-stringify/sync';

const storage = multer.memoryStorage();
const upload = multer({ storage });

class StudentController implements IController {
    public router: Router = express.Router();

    constructor() {
        this.initRoutes()
    }

    initRoutes(): void {
        this.router.post('/student/create', verifyToken, this.createStudent)
        this.router.get('/student/list', verifyToken, this.studentFilter)
        this.router.post('/student/ids', verifyToken, this.studentByIds)
        this.router.post('/student/upload', verifyToken, upload.single('file'), this.uploadStudentsFromCSV);
        this.router.get('/student/export', verifyToken, this.exportStudentsToCSV);

        this.router.get('/student/:id', verifyToken, this.studentView)
        this.router.put('/student/:id', verifyToken, this.studentEdit)
        this.router.delete('/student/:id', verifyToken, this.studentDelete)

        this.router.get('/student/:id/parents', verifyToken, this.studentParent)
        this.router.post('/student/:id/parents', verifyToken, this.changeStudentParent)
    }

    exportStudentsToCSV = async (req: ExtendedRequest, res: Response) => {
        try {
            const students = await DB.query(`SELECT
                email, phone_number, given_name, family_name, student_number
                FROM Student
                WHERE school_id = :school_id`, {
                school_id: req.user.school_id
            });

            if (students.length === 0) {
                return res.status(404).json({
                    error: 'No students found'
                }).end();
            }

            const csvData = students.map((student: any) => ({
                email: student.email,
                phone_number: student.phone_number,
                given_name: student.given_name,
                family_name: student.family_name,
                student_number: student.student_number
            }));

            const csvContent = stringify(csvData, {
                header: true,
                columns: ['email', 'phone_number', 'given_name', 'family_name', 'student_number']
            });

            res.header('Content-Type', 'text/csv; charset=utf-8');
            res.header('Content-Disposition', 'attachment; filename=students.csv');
            res.send(Buffer.from('\uFEFF' + csvContent, 'utf-8')).end();
        } catch (e: any) {
            return res.status(500).json({
                error: 'Internal server error',
                details: e.message
            }).end();
        }
    }

    uploadStudentsFromCSV = async (req: ExtendedRequest, res: Response) => {
        const { throwInError, action, withCSV } = req.body;
        const throwInErrorBool = throwInError === 'true';
        const withCSVBool = withCSV === 'true';

        const results: any[] = [];
        const errors: any[] = [];
        const inserted: any[] = [];
        const updated: any[] = [];
        const deleted: any[] = [];

        try {
            if (!req.file || !req.file.buffer) {
                return res.status(400).json({
                    error: 'Bad Request',
                    details: 'File is missing or invalid'
                }).end();
            }

            const decodedContent = await iconv.decode(req.file.buffer, 'UTF-8');
            const stream = Readable.from(decodedContent)

            await new Promise((resolve, reject) => {
                stream
                    .pipe(csv())
                    .on('headers', (headers: any) => {
                        if (headers.length > 0 && headers[0].charCodeAt(0) === 0xFEFF) {
                            headers[0] = headers[0].slice(1);
                        }
                        headers = headers.map((header: string) => header.trim());
                    })
                    .on('data', (data: any) => {
                        if (Object.values(data).some((value: any) => value.trim() !== '')) {
                            results.push(data);
                        }
                    })
                    .on('end', resolve)
                    .on('error', reject);
            });

            const validResults: any[] = []
            const existingEmailsInCSV: string[] = []
            const existingStudentNumbersInCSV: string[] = []
            for (const row of results) {
                const { email, phone_number, given_name, family_name, student_number } = row;
                const rowErrors: any = {};
                const normalizedEmail = String(email).trim();
                const normalizedPhoneNumber = Number(phone_number).toString();
                const normalizedGiven = String(given_name).trim();
                const normalizedFamily = String(family_name).trim();
                const normalizedStudent = String(student_number).trim();

                if (!isValidEmail(normalizedEmail)) rowErrors.email = 'Invalid email';
                if (!isValidPhoneNumber(normalizedPhoneNumber)) rowErrors.phone_number = 'Invalid phone number';
                if (!isValidString(normalizedGiven)) rowErrors.given_name = 'Invalid given name';
                if (!isValidString(normalizedFamily)) rowErrors.family_name = 'Invalid family name';
                if (!isValidStudentNumber(normalizedStudent)) rowErrors.student_number = 'Invalid student number';
                if (existingEmailsInCSV.includes(normalizedEmail)) {
                    rowErrors.email = 'This email already exists'
                }
                if (existingStudentNumbersInCSV.includes(normalizedStudent)) {
                    rowErrors.student_number = 'This student number already exists'
                }

                if (Object.keys(rowErrors).length > 0) {
                    errors.push({ row, errors: rowErrors });
                } else {
                    row.email = normalizedEmail;
                    row.phone_number = normalizedPhoneNumber;
                    row.given_name = normalizedGiven
                    row.family_name = normalizedFamily
                    row.student_number = normalizedStudent
                    existingEmailsInCSV.push(row.email)
                    existingStudentNumbersInCSV.push(row.student_number)

                    validResults.push(row);
                }
            }

            if (errors.length > 0 && throwInErrorBool) {
                return res.status(400).json({ errors: errors }).end();
            }

            const emails = validResults.map(row => row.email);
            if (emails.length === 0) {
                return res.status(400).json({
                    errors: errors,
                    message: 'All data invalid'
                }).end();
            }
            const existingStudents = await DB.query('SELECT email FROM Student WHERE email IN (:emails)', {
                emails,
            });
            const existingStudentsNumbers = await DB.query('SELECT student_number FROM Student WHERE student_number IN (:studentNumbers)', {
                studentNumbers: validResults.map(row => row.student_number)
            });
            const existingStudentNumbers = existingStudentsNumbers.map((student: any) => student.student_number);
            const existingEmails = existingStudents.map((student: any) => student.email);

            if (action === 'create') {
                for (const row of validResults) {
                    if (existingEmails.includes(row.email)) {
                        errors.push({ row, errors: { email: 'Student\'s email already exists' } });
                    } else if (existingStudentNumbers.includes(row.student_number)) {
                        errors.push({ row, errors: { student_number: 'Student\s student number already exists' } });
                    } else {
                        await DB.execute(
                            `INSERT INTO Student(email, phone_number, given_name, family_name, student_number, school_id)
                        VALUE (:email, :phone_number, :given_name, :family_name, :student_number, :school_id);`, {
                            email: row.email,
                            phone_number: row.phone_number,
                            given_name: row.given_name,
                            family_name: row.family_name,
                            student_number: row.student_number,
                            school_id: req.user.school_id,
                        });
                        inserted.push(row);
                    }
                }
            } else if (action === 'update') {
                for (const row of validResults) {
                    if (!existingEmails.includes(row.email)) {
                        errors.push({ row, errors: { email: 'Student does not exist' } });
                    } else {
                        await DB.execute(
                            `UPDATE Student SET
                        phone_number = :phone_number,
                        given_name = :given_name,
                        family_name = :family_name,
                        student_number = :student_number
                        WHERE email = :email`, {
                            email: row.email,
                            phone_number: row.phone_number,
                            given_name: row.given_name,
                            family_name: row.family_name,
                            student_number: row.student_number,
                        });
                        updated.push(row);
                    }
                }
            } else if (action === 'delete') {
                for (const row of validResults) {
                    if (!existingEmails.includes(row.email)) {
                        errors.push({ row, errors: { email: 'Student does not exist' } });
                    } else {
                        await DB.execute('DELETE FROM Student WHERE email = :email AND school_id = :school_id', {
                            email: row.email,
                            school_id: req.user.school_id,
                        });
                        deleted.push(row);
                    }
                }
            } else {
                return res.status(400).json({
                    error: 'Bad Request',
                    details: 'Invalid action'
                }).end();
            }

            if (errors.length > 0) {
                let csvFile: Buffer | null = null;
                if (withCSVBool) {
                    const csvData = errors.map((error: any) => ({
                        email: error?.row?.email,
                        phone_number: error?.row?.phone_number,
                        given_name: error?.row?.given_name,
                        family_name: error?.row?.family_name,
                        student_number: error?.row?.student_number
                    }));
                    const csvContent = stringify(csvData, {
                        header: true,
                        columns: ['email', 'phone_number', 'given_name', 'family_name', 'student_number']
                    });
                    // response headers for sending multipart files to send it with json response
                    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
                    res.setHeader('Content-Disposition', 'attachment; filename=errors.csv');

                    csvFile = Buffer.from('\uFEFF' + csvContent, 'utf-8')
                }

                return res.status(400).json({
                    message: 'CSV processed successfully but with errors',
                    inserted: inserted,
                    updated: updated,
                    deleted: deleted,
                    errors: errors.length > 0 ? errors : null,
                    csvFile: csvFile,
                }).end()
            }

            return res.status(200).json({
                message: 'CSV processed successfully',
                inserted: inserted,
                updated: updated,
                deleted: deleted,
            }).end()
        } catch (e: any) {
            return res.status(500).json({
                error: 'Internal server error',
                details: e.message
            }).end();
        }
    }

    changeStudentParent = async (req: ExtendedRequest, res: Response) => {
        try {
            const studentId = req.params.id;

            if (!studentId || !isValidId(studentId)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing student id'
                }
            }

            const studentInfo = await DB.query(`SELECT 
                id, email, given_name, family_name, 
                phone_number, student_number 
                FROM Student 
                WHERE id = :id AND school_id = :school_id`, {
                id: studentId,
                school_id: req.user.school_id
            });

            if (studentInfo.length <= 0) {
                throw {
                    status: 404,
                    message: 'Student not found'
                }
            }

            const student = studentInfo[0];

            const { parents } = req.body
            if (parents && Array.isArray(parents) && isValidArrayId(parents)) {
                const existingParents = await DB.query(`SELECT parent_id
                    FROM StudentParent
                    WHERE student_id = :student_id;`, {
                    student_id: student.id
                })


                const existingParentIds = existingParents.map((parent: any) => parent.parent_id);
                const newParentIds = parents.filter((id: any) => !existingParentIds.includes(id));
                const removedParentIds = existingParentIds.filter((id: any) => !parents.includes(id));

                if (removedParentIds.length > 0) {
                    await DB.query(`DELETE FROM StudentParent 
                        WHERE student_id = :student_id AND parent_id IN (:parentIds);`, {
                        student_id: student.id,
                        parentIds: removedParentIds
                    });

                    await DB.query(`
                            DELETE pp 
                            FROM PostParent AS pp
                            INNER JOIN PostStudent AS ps ON pp.post_student_id = ps.id
                            WHERE ps.student_id = :student_id AND pp.parent_id IN (:parentIds);`, {
                        student_id: student.id,
                        parentIds: removedParentIds
                    });
                }

                if (newParentIds.length > 0) {
                    const limitValidate = await DB.query(`SELECT pa.id
                        FROM Parent AS pa
                        LEFT JOIN StudentParent AS sp on pa.id = sp.parent_id
                        WHERE pa.id IN (:parents)
                        GROUP BY pa.id
                        HAVING COUNT(sp.student_id) < 5;`, {
                        parents: newParentIds
                    })

                    if (limitValidate.length > 0) {
                        const validParentIds = limitValidate.map((item: any) => item.id);
                        const insertData = validParentIds.map((parentId: any) => ({
                            student_id: student.id,
                            parent_id: parentId
                        }));
                        const valuesString = insertData.map((item: any) => `(${item.student_id}, ${item.parent_id})`).join(', ');
                        await DB.query(`INSERT INTO StudentParent (student_id, parent_id)
                        VALUES ${valuesString};`);

                        //     for (const parentId of limitValidate) {
                        //         await DB.query(`INSERT INTO StudentParent (student_id, parent_id)
                        // VALUES (:student_id, :parent_id);`, {
                        //             student_id: student.id,
                        //             parent_id: parentId.parent_id
                        //         });
                        //     }
                    }
                }


                return res.status(200).json({
                    message: 'Parents changed successfully'
                }).end()
            } else {
                throw {
                    status: 401,
                    message: 'Invalid or missing parents'
                }
            }
        } catch (e: any) {
            if (e.status) {
                return res.status(e.status).json({
                    error: e.message
                }).end();
            } else {
                return res.status(500).json({
                    error: 'Internal server error'
                }).end();
            }
        }
    }

    studentParent = async (req: ExtendedRequest, res: Response) => {
        try {
            const studentId = req.params.id;

            if (!studentId || !isValidId(studentId)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing student id'
                }
            }

            const studentInfo = await DB.query(`SELECT 
                id, email, given_name, family_name, 
                phone_number, student_number 
                FROM Student 
                WHERE id = :id AND school_id = :school_id`, {
                id: studentId,
                school_id: req.user.school_id
            });

            if (studentInfo.length <= 0) {
                throw {
                    status: 404,
                    message: 'Student not found'
                }
            }

            const student = studentInfo[0];


            const studentParents = await DB.query(`SELECT pa.id, pa.given_name, pa.family_name
                FROM StudentParent AS sp
                INNER JOIN Parent AS pa on sp.parent_id = pa.id
                WHERE sp.student_id = :student_id;`, {
                student_id: student.id
            })

            return res.status(200).json({
                student: student,
                parents: studentParents,
            }).end()
        } catch (e: any) {
            if (e.status) {
                return res.status(e.status).json({
                    error: e.message
                }).end();
            } else {
                return res.status(500).json({
                    error: 'Internal server error'
                }).end();
            }
        }
    }

    studentDelete = async (req: ExtendedRequest, res: Response) => {
        try {
            const studentId = req.params.id;

            if (!studentId || !isValidId(studentId)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing student id'
                }
            }
            const studentInfo = await DB.query(`SELECT 
                id, email, given_name, family_name, 
                phone_number, student_number 
                FROM Student 
                WHERE id = :id AND school_id = :school_id`, {
                id: studentId,
                school_id: req.user.school_id
            });

            if (studentInfo.length <= 0) {
                throw {
                    status: 404,
                    message: 'Student not found'
                }
            }

            await DB.execute('DELETE FROM Student WHERE id = :id;', {
                id: studentId
            })

            return res.status(200).json({
                message: 'Student deleted successfully'
            }).end()
        } catch (e: any) {
            if (e.status) {
                return res.status(e.status).json({
                    error: e.message
                }).end();
            } else {
                return res.status(500).json({
                    error: 'Internal server error'
                }).end();
            }
        }
    }

    studentEdit = async (req: ExtendedRequest, res: Response) => {
        try {
            const {
                phone_number,
                given_name,
                family_name,
                student_number
            } = req.body

            if (!phone_number || !isValidPhoneNumber(phone_number)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing phone number'
                }
            }
            if (!given_name || !isValidString(given_name)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing given name'
                }
            }
            if (!family_name || !isValidString(family_name)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing family name'
                }
            }
            if (!student_number || !isValidStudentNumber(student_number)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing student number'
                }
            }

            const studentId = req.params.id;

            if (!studentId || !isValidId(studentId)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing student id'
                }
            }
            const studentInfo = await DB.query(`SELECT 
                id, email FROM Student
                WHERE id = :id AND school_id = :school_id`, {
                id: studentId,
                school_id: req.user.school_id
            });

            if (studentInfo.length <= 0) {
                throw {
                    status: 404,
                    message: 'Student not found'
                }
            }

            const student = studentInfo[0];

            const findDuplicates = await DB.query('SELECT id, phone_number FROM Student WHERE phone_number = :phone_number', {
                phone_number: phone_number,
            })

            if (findDuplicates.length >= 1) {
                const duplicate = findDuplicates[0];
                if (duplicate.id != studentId) {
                    if (phone_number == duplicate.phone_number) {
                        throw {
                            status: 401,
                            message: 'This phone_number already exists'
                        }
                    }
                }
            }

            await DB.execute(
                `UPDATE Student SET
                        student_number = :student_number,
                        phone_number = :phone_number,
                        family_name = :family_name,
                        given_name = :given_name
                    WHERE id = :id`, {
                phone_number: phone_number,
                given_name: given_name,
                family_name: family_name,
                student_number: student_number,
                id: student.id
            });

            return res.status(200).json({
                student: {
                    id: student.id,
                    email: student.email,
                    phone_number: phone_number,
                    given_name: given_name,
                    family_name: family_name,
                    student_number: student_number,
                }
            }).end()
        } catch (e: any) {
            if (e.status) {
                return res.status(e.status).json({
                    error: e.message
                }).end();
            } else {
                return res.status(500).json({
                    error: 'Internal server error'
                }).end();
            }
        }
    }

    studentView = async (req: ExtendedRequest, res: Response) => {
        try {
            const studentId = req.params.id;

            if (!studentId || !isValidId(studentId)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing student id'
                }
            }
            const studentInfo = await DB.query(`SELECT 
                id, email, given_name, family_name, 
                phone_number, student_number 
                FROM Student 
                WHERE id = :id AND school_id = :school_id`, {
                id: studentId,
                school_id: req.user.school_id
            });

            if (studentInfo.length <= 0) {
                throw {
                    status: 404,
                    message: 'Student not found'
                }
            }

            const student = studentInfo[0];


            const studentParents = await DB.query(`SELECT pa.id, pa.email, 
                pa.phone_number, pa.given_name, pa.family_name
                FROM StudentParent AS sp
                INNER JOIN Parent AS pa on sp.parent_id = pa.id
                WHERE sp.student_id = :student_id;`, {
                student_id: student.id
            })

            const studentGroups = await DB.query(`SELECT sg.id,sg.name FROM GroupMember AS gm
                INNER JOIN StudentGroup AS sg ON gm.group_id = sg.id
                WHERE student_id = :student_id AND sg.school_id = :school_id`, {
                student_id: student.id,
                school_id: req.user.school_id,
            });

            return res.status(200).json({
                student: student,
                parents: studentParents,
                groups: studentGroups
            }).end()
        } catch (e: any) {
            if (e.status) {
                return res.status(e.status).json({
                    error: e.message
                }).end();
            } else {
                return res.status(500).json({
                    error: 'Internal server error'
                }).end();
            }
        }
    }

    studentByIds = async (req: ExtendedRequest, res: Response) => {
        try {
            const { studentIds } = req.body

            if (studentIds && Array.isArray(studentIds) && isValidArrayId(studentIds)) {
                const studentList = await DB.query(`SELECT id,given_name, family_name 
                        FROM Student WHERE id IN (:students) AND school_id = :school_id`, {
                    students: studentIds,
                    school_id: req.user.school_id,
                })

                return res.status(200).json({
                    studentList
                }).end();
            } else {
                throw {
                    status: 401,
                    message: 'Invalid id list'
                }
            }
        } catch (e: any) {
            if (e.status) {
                return res.status(e.status).json({
                    error: e.message
                }).end();
            } else {
                return res.status(500).json({
                    error: 'Internal server error'
                }).end();
            }
        }
    }

    studentFilter = async (req: ExtendedRequest, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(process.env.PER_PAGE + '');
            const offset = (page - 1) * limit;

            const name = req.query.name as string || '';

            const filters = [];
            const params: any = {
                school_id: req.user.school_id,
                limit: limit,
                offset: offset
            };

            if (name) {
                filters.push('(given_name LIKE :name OR family_name LIKE :name OR email LIKE :name OR student_number LIKE :name)');
                params.name = `%${name}%`;
            }

            const whereClause = filters.length > 0 ? 'AND ' + filters.join(' AND ') : '';

            const studentList = await DB.query(`SELECT 
                id, email, given_name, family_name, 
                phone_number, student_number
                FROM Student
                WHERE school_id = :school_id ${whereClause}
                ORDER BY id DESC
                LIMIT :limit OFFSET :offset;`, params);

            const totalStudents = (await DB.query(`SELECT COUNT(*) as total
                FROM Student WHERE school_id = :school_id ${whereClause};`, params))[0].total

            const totalPages = Math.ceil(totalStudents / limit);

            const pagination = {
                current_page: page,
                per_page: limit,
                total_pages: totalPages,
                total_students: totalStudents,
                next_page: page < totalPages ? page + 1 : null,
                prev_page: page > 1 ? page - 1 : null,
                links: generatePaginationLinks(page, totalPages)
            };

            return res.status(200).json({
                students: studentList,
                pagination: pagination
            }).end();
        } catch (e: any) {
            if (e.status) {
                return res.status(e.status).json({
                    error: e.message
                }).end();
            } else {
                return res.status(500).json({
                    error: 'Internal server error'
                }).end();
            }
        }
    }

    createStudent = async (req: ExtendedRequest, res: Response) => {
        try {
            const {
                email,
                phone_number,
                given_name,
                family_name,
                student_number,
                parents
            } = req.body


            if (!email || !isValidEmail(email)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing email'
                }
            }
            if (!phone_number || !isValidPhoneNumber(phone_number)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing phone number'
                }
            }
            if (!given_name || !isValidString(given_name)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing given name'
                }
            }
            if (!family_name || !isValidString(family_name)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing family name'
                }
            }
            if (!student_number || !isValidStudentNumber(student_number)) {
                throw {
                    status: 401,
                    message: 'Invalid or missing student number'
                }
            }

            const findDuplicates = await DB.query('SELECT email, phone_number FROM Student WHERE email = :email OR phone_number = :phone_number', {
                email: email,
                phone_number: phone_number,
            })

            if (findDuplicates.length >= 1) {
                const duplicate = findDuplicates[0];

                if (email == duplicate.email && phone_number == duplicate.phone_number) {
                    throw {
                        status: 401,
                        message: 'This email and phone_number already exists'
                    }
                }
                if (phone_number == duplicate.phone_number) {
                    throw {
                        status: 401,
                        message: 'This phone_number already exists'
                    }
                } else {
                    throw {
                        status: 401,
                        message: 'This email already exists'
                    }
                }
            }


            const studentInsert = await DB.execute(
                `INSERT INTO Student(email, phone_number, given_name, family_name, student_number, school_id)
                VALUE (:email,:phone_number,:given_name,:family_name,:student_number,:school_id)`, {
                email: email,
                phone_number: phone_number,
                given_name: given_name,
                family_name: family_name,
                student_number: student_number,
                school_id: req.user.school_id,
            });

            const studentId = studentInsert.insertId;
            const attachedParents: any[] = [];
            if (parents && Array.isArray(parents) && isValidArrayId(parents)
                && parents.length > 0) {
                const parentRows = await DB.query(`SELECT parent_id
                        FROM StudentParent WHERE parent_id IN (:parents)
                        GROUP BY parent_id
                        HAVING COUNT(student_id) < 5`, {
                    parents: parents
                })

                if (parentRows.length > 0) {
                    const values = parentRows.map((parent: any) => `(${parent.parent_id}, ${studentId})`).join(', ');
                    await DB.execute(`INSERT INTO StudentParent (parent_id, student_id) VALUES ${values}`);

                    const parentList = await DB.query(`SELECT pa.id,pa.email,pa.phone_number,pa.given_name,pa.family_name 
                        FROM Parent as pa
                        INNER JOIN StudentParent as sp
                        ON sp.parent_id = pa.id AND sp.student_id = :student_id`, {
                        student_id: studentId,
                    })

                    attachedParents.push(...parentList);
                }
            }

            return res.status(200).json({
                student: {
                    id: studentId,
                    email: email,
                    phone_number: phone_number,
                    given_name: given_name,
                    family_name: family_name,
                    student_number: student_number,
                    parents: attachedParents
                }
            }).end()
        } catch (e: any) {
            if (e.status) {
                return res.status(e.status).json({
                    error: e.message
                }).end();
            } else {
                return res.status(500).json({
                    error: 'Internal server error'
                }).end();
            }
        }
    }
}

export default StudentController