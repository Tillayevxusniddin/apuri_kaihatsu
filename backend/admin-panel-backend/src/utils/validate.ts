import iconv from 'iconv-lite';
import chardet from 'chardet';

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPhoneNumber(phone_number: string): boolean {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone_number);
}

export function isValidString(name: string): boolean {
    return typeof name === 'string' && name.trim().length > 0;
}

export function isValidStudentNumber(student_number: string): boolean {
    return typeof student_number === 'string' && student_number.trim().length > 0
}

export function isValidId(id: string): boolean {
    return parseInt(id) > 0 && /^\d+$/.test(id);
}

export function isValidArrayId(ids: number[]): boolean {
    if (!Array.isArray(ids)) {
        return false;
    }
    return ids.every(id => Number.isInteger(id) && id > 0);
}

const priorityList = ["low", "medium", "high"]

export function isValidPriority(priority: string): boolean {
    return typeof priority === 'string' && priorityList.includes(priority)
}

const permissionList = {}

export function isValidPermissions(permissions: any): boolean {
    return false
}

const formStatusList = ['accept', 'reject', 'wait']

export function isValidStatus(status: string): boolean {
    return typeof status === 'string' && formStatusList.includes(status)
}

const reasonList = [
    'other', 'absence', 'lateness', 'leaving early'
]
export function isValidReason(reason: string): boolean {
    return typeof reason === 'string' && reasonList.includes(reason)
}

export const commonJapaneseEncodings = ['Shift_JIS', 'EUC-JP', 'ISO-2022-JP', 'cp932'];

export async function detectAndDecodeContent(buffer: Buffer): Promise<string> {
    // First, try to detect the encoding
    const detectedEncoding = chardet.detect(buffer) ?? 'UTF-8';
    console.log('Detected encoding:', detectedEncoding);

    // Try the detected encoding first
    try {
        const decodedContent = iconv.decode(buffer, detectedEncoding);
        if (isValidContent(decodedContent)) {
            return decodedContent;
        }
    } catch (error) {
        console.log(`Failed to decode with detected encoding ${detectedEncoding}`);
    }

    // If the detected encoding fails, try common Japanese encodings
    for (const encoding of commonJapaneseEncodings) {
        try {
            const decodedContent = iconv.decode(buffer, encoding);
            if (isValidContent(decodedContent)) {
                console.log('Successfully decoded with:', encoding);
                return decodedContent;
            }
        } catch (error) {
            console.log(`Failed to decode with ${encoding}`);
        }
    }

    throw new Error('Unable to decode the file with any known encoding');
}

export function isValidContent(content: string): boolean {
    // Check if the content seems valid (e.g., contains expected headers or Japanese characters)
    return content.includes('email') && /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(content);
}