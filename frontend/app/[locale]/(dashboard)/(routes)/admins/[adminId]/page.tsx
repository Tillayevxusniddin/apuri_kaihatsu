// import { Card, CardHeader } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Link } from "@/navigation";
// import { Button } from "@/components/ui/button";
// import DisplayProperty from "@/components/DisplayProperty";
// import { FormatDateTime } from "@/lib/server/utils";
// import { getTranslations } from "next-intl/server";
// import { auth } from "@/auth";
// import { signIn } from "next-auth/react";
// import NotFound from "@/components/NotFound";
//
// export default async function ThisAdmin({
//   params: { adminId },
// }: {
//   params: { adminId: string };
// }) {
//   const session = await auth();
//
//   if (!session) await signIn();
//
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${adminId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session?.sessionToken}`,
//       },
//     }
//   );
//
//   if (!response.ok) {
//     if (response.status === 404) return <NotFound />;
//     throw new Error("An error occurred while fetching the data");
//   }
//
//   const adminData = await response.json();
//
//   const t = await getTranslations("ThisAdmin");
//
//   return (
//     <div className="space-y-4">
//       <div className="w-full flex justify-between">
//         <h1 className="text-3xl w-2/4 font-bold">{t("AdminView")}</h1>
//         <div className="flex flex-wrap gap-2">
//           <Link href={`/admins`}>
//             <Button variant={"secondary"}>{t("back")}</Button>
//           </Link>
//           <Link href={`/admins/edit/${adminId}`}>
//             <Button>{t("editAdmin")}</Button>
//           </Link>
//         </div>
//       </div>
//       <Card className="space-y-4">
//         <CardHeader>
//           <DisplayProperty
//             property={t("adminGivenName")}
//             value={adminData?.admin?.given_name}
//           />
//           <DisplayProperty
//             property={t("adminFamilyName")}
//             value={adminData?.admin?.family_name}
//           />
//           <DisplayProperty
//             property={t("adminEmail")}
//             value={adminData?.admin?.email}
//           />
//           <DisplayProperty
//             property={t("adminPhoneNumber")}
//             value={adminData?.admin?.phone_number}
//           />
//           <DisplayProperty
//             property={t("adminCreationDate")}
//             value={await FormatDateTime(adminData?.admin?.created_at)}
//           />
//         </CardHeader>
//         <Separator />
//       </Card>
//     </div>
//   );
// }


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "@/navigation"
import { Button } from "@/components/ui/button"
import { PermissionsTable } from "@/components/permissions-table"
import { FormatDateTime } from "@/lib/server/utils"
import { getTranslations } from "next-intl/server"
import { auth } from "@/auth"
import { signIn } from "next-auth/react"
import NotFound from "@/components/NotFound"
import { Edit, Trash, User, Mail, Phone, Calendar } from 'lucide-react'

export default async function ThisAdmin({
                                          params: { adminId },
                                        }: {
  params: { adminId: string };
}) {
  const session = await auth();

  if (!session) await signIn();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${adminId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.sessionToken}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) return <NotFound />;
    throw new Error("An error occurred while fetching the data");
  }

  const adminData = await response.json();
  const t = await getTranslations("ThisAdmin");

  // Pre-translate all permission-related strings
  const permissions = [
    { name: "canEdit", defaultEnabled: true, label: t("canEdit") },
    { name: "canDelete", defaultEnabled: false, label: t("canDelete") },
    { name: "canCreate", defaultEnabled: true, label: t("canCreate") },
    { name: "canViewReports", defaultEnabled: true, label: t("canViewReports") },
    { name: "canManageUsers", defaultEnabled: false, label: t("canManageUsers") },
  ];

  const permissionLabels = {
    permission: t("Permission"),
    status: t("Status"),
    toggle: t("Toggle"),
    enabled: t("enabled"),
    disabled: t("disabled"),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {t("AdminView")}
          </h1>
          <Link href="/admins">
            <Button variant="outline" size="lg" className="dark:border-slate-700">
              {t("back")}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Information Card */}
          <Card className="lg:col-span-2 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader className="border-b dark:border-slate-700">
              <CardTitle className="text-2xl flex items-center gap-2 dark:text-white">
                <User className="h-6 w-6" />
                {t("AdminInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t("adminGivenName")}
                    </label>
                    <p className="text-lg font-semibold dark:text-white">
                      {adminData?.admin?.given_name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t("adminFamilyName")}
                    </label>
                    <p className="text-lg font-semibold dark:text-white">
                      {adminData?.admin?.family_name}
                    </p>
                  </div>
                </div>
                <Separator className="dark:border-slate-700" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t("adminEmail")}
                    </label>
                  </div>
                  <p className="text-lg font-semibold dark:text-white">
                    {adminData?.admin?.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t("adminPhoneNumber")}
                    </label>
                  </div>
                  <p className="text-lg font-semibold dark:text-white">
                    {adminData?.admin?.phone_number}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {t("adminCreationDate")}
                    </label>
                  </div>
                  <p className="text-lg font-semibold dark:text-white">
                    {await FormatDateTime(adminData?.admin?.created_at)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="dark:border-slate-700 dark:bg-slate-800">
            <CardHeader className="border-b dark:border-slate-700">
              <CardTitle className="text-2xl dark:text-white">{t("QuickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Link href={`/admins/edit/${adminId}`} className="block">
                <Button className="w-full" size="lg">
                  <Edit className="mr-2 h-5 w-5" />
                  {t("editAdmin")}
                </Button>
              </Link>
              <Button variant="destructive" className="w-full" size="lg">
                <Trash className="mr-2 h-5 w-5" />
                {t("deleteAdmin")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Permissions Table */}
        <Card className="dark:border-slate-700 dark:bg-slate-800">
          <CardHeader className="border-b dark:border-slate-700">
            <CardTitle className="text-2xl dark:text-white">{t("Permissions")}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PermissionsTable
              permissions={permissions}
              labels={permissionLabels}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}






