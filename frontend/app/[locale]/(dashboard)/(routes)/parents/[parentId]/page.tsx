"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Parent from "@/types/parent";
import Student from "@/types/student";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { FormatDateTime } from "@/lib/utils";
import TableApi from "@/components/TableApi";
import DisplayProperty from "@/components/DisplayProperty";
import NotFound from "@/components/NotFound";
import useApiQuery from "@/lib/useApiQuery";

export default function ThisParent({
  params: { parentId },
}: {
  params: { parentId: string };
}) {
  const t = useTranslations("ThisParent");
  const tName = useTranslations("names");
  const { data: parentData, isError } = useApiQuery<{
    parent: Parent;
    students: Student[];
  }>(`parent/${parentId}`, ["parent", parentId]);

  const studentColumns: ColumnDef<Student>[] = [
    {
      accessorKey: "name",
      header: t("name"),
      cell: ({ row }) => (
        <div>{tName("name", { ...row?.original, parents: "" })}</div>
      ),
    },
    {
      accessorKey: "email",
      header: t("Email"),
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone_number",
      header: t("Phone_number"),
      cell: ({ row }) => <div>{row.getValue("phone_number")}</div>,
    },
    {
      accessorKey: "student_number",
      header: t("Ststudent_number"),
      cell: ({ row }) => <div>{row.getValue("student_number")}</div>,
    },
  ];

  const dateValue = FormatDateTime(parentData?.parent.created_at ?? "");

  if (isError) return <NotFound />;

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl w-2/4 font-bold">{t("ParentView")}</h1>
        <div className="flex flex-wrap gap-2">
          <Link href={`/parents`}>
            <Button variant={"secondary"}>{t("back")}</Button>
          </Link>
          <Link href={`/parents/edit/${parentId}`}>
            <Button>{t("editParent")}</Button>
          </Link>
        </div>
      </div>
      <Card className="space-y-4">
        <CardHeader>
          <DisplayProperty
            property={t("parentGivenName")}
            value={parentData?.parent.given_name}
          />
          <DisplayProperty
            property={t("parentFamilyName")}
            value={parentData?.parent.family_name}
          />
          <DisplayProperty
            property={t("parentEmail")}
            value={parentData?.parent.email}
          />
          <DisplayProperty
            property={t("parentPhoneNumber")}
            value={parentData?.parent.phone_number}
          />
          <DisplayProperty
            property={t("parentCreationDate")}
            value={dateValue}
          />
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl w-2/4 font-bold">{t("students")}</h2>
            <Link href={`/parents/${parentId}/students`}>
              <Button>{t("editStudents")}</Button>
            </Link>
          </div>
          <div className="rounded-md border">
            <TableApi
              data={parentData?.students ?? null}
              columns={studentColumns}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}