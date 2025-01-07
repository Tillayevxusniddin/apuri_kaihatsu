// "use client";
//
// import { useTranslations } from "next-intl";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Card } from "@/components/ui/card";
// import { EllipsisVertical, File } from "lucide-react";
// import { ColumnDef } from "@tanstack/react-table";
// import PaginationApi from "@/components/PaginationApi";
// import { Input } from "@/components/ui/input";
// import { Link, useRouter } from "@/navigation";
// import { Button } from "@/components/ui/button";
// import Admin from "@/types/admin";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import TableApi from "@/components/TableApi";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import { useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { toast } from "@/components/ui/use-toast";
// import useApiQuery from "@/lib/useApiQuery";
// import AdminApi from "@/types/adminApi";
// import useApiMutation from "@/lib/useApiMutation";
// import useFileMutation from "@/lib/useFileMutation";
//
// export default function Admins() {
//   const t = useTranslations("admins");
//   const tName = useTranslations("names");
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const { data } = useApiQuery<AdminApi>(
//     `admin/list?page=${page}&name=${search}`,
//     ["admins", page, search]
//   );
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const [adminId, setAdminId] = useState<number | null>(null);
//   const { mutate } = useApiMutation<{ message: string }>(
//     `admin/${adminId}`,
//     "DELETE",
//     ["deleteAdmin"],
//     {
//       onSuccess: (data) => {
//         queryClient.invalidateQueries({
//           queryKey: ["admins"],
//         });
//         toast({
//           title: t("adminDeleted"),
//           description: data?.message,
//         });
//       },
//     }
//   );
//   const { mutate: exportAdmins } = useFileMutation(`admin/export`, [
//     "exportAdmins",
//   ]);
//
//   const adminColumns: ColumnDef<Admin>[] = [
//     {
//       accessorKey: "name",
//       header: t("adminName"),
//       cell: ({ row }) => (
//         <Link href={`admins/${row.original.id}`}>
//           {tName("name", { ...row?.original })}
//         </Link>
//       ),
//     },
//     {
//       accessorKey: "email",
//       header: t("Email"),
//       cell: ({ row }) => (
//         <Link href={`admins/${row.original.id}`}>{row.getValue("email")}</Link>
//       ),
//     },
//     {
//       accessorKey: "phone_number",
//       header: t("Phone_number"),
//       cell: ({ row }) => (
//         <Link href={`admins/${row.original.id}`}>
//           {row.getValue("phone_number")}
//         </Link>
//       ),
//     },
//     {
//       header: t("action"),
//       cell: ({ row }) => (
//         <Dialog>
//           <DropdownMenu modal={false}>
//             <DropdownMenuTrigger>
//               <EllipsisVertical />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem
//                 onClick={() => {
//                   router.push(`./admins/${row.original.id}`);
//                 }}
//               >
//                 {t("view")}
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => router.push(`./admins/edit/${row.original.id}`)}
//               >
//                 {t("edit")}
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <DialogTrigger className="w-full">{t("delete")}</DialogTrigger>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>{tName("name", { ...row?.original })}</DialogTitle>
//               <DialogDescription>{row.original.email}</DialogDescription>
//             </DialogHeader>
//             <div className="flex">{t("doYouDeleteAdmin")}</div>
//             <DialogFooter>
//               <DialogClose asChild>
//                 <Button variant={"secondary"}>{t("close")}</Button>
//               </DialogClose>
//               <Button
//                 onClick={() => {
//                   setAdminId(row.original.id);
//                   mutate();
//                 }}
//               >
//                 {t("confirm")}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       ),
//     },
//   ];
//
//   return (
//     <div className="w-full">
//       <div className="space-y-4">
//         <div className="w-full flex justify-between">
//           <h1 className="text-3xl w-2/4 font-bold">{t("admins")}</h1>
//           <Link href={`./admins/create`}>
//             <Button>{t("createadmin")}</Button>
//           </Link>
//         </div>
//         <div className="flex justify-between">
//           <Input
//             placeholder={t("filter")}
//             onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             className="max-w-sm"
//           />
//           <div className="">
//             <PaginationApi data={data?.pagination ?? null} setPage={setPage} />
//           </div>
//         </div>
//         <div className="flex justify-end items-center">
//           <Button
//             onClick={() => exportAdmins()}
//             size="sm"
//             variant="outline"
//             className="h-7 gap-1 text-sm"
//           >
//             <File className="h-3.5 w-3.5" />
//             <span className="sr-only sm:not-sr-only">Export</span>
//           </Button>
//         </div>
//         <Card x-chunk="dashboard-05-chunk-3">
//           <TableApi data={data?.admins ?? null} columns={adminColumns} />
//         </Card>
//       </div>
//     </div>
//   );
// }
//


//-----------------2 versiya ---------------
//
// "use client";
//
// import { useTranslations } from "next-intl";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { EllipsisVertical, File, Plus } from 'lucide-react';
// import { ColumnDef } from "@tanstack/react-table";
// import PaginationApi from "@/components/PaginationApi";
// import { Input } from "@/components/ui/input";
// import { Link, useRouter } from "@/navigation";
// import { Button } from "@/components/ui/button";
// import Admin from "@/types/admin";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import TableApi from "@/components/TableApi";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import { useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { toast } from "@/components/ui/use-toast";
// import useApiQuery from "@/lib/useApiQuery";
// import AdminApi from "@/types/adminApi";
// import useApiMutation from "@/lib/useApiMutation";
// import useFileMutation from "@/lib/useFileMutation";
// import { Badge } from "@/components/ui/badge";
//
// export default function Admins() {
//   const t = useTranslations("admins");
//   const tName = useTranslations("names");
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const { data } = useApiQuery<AdminApi>(
//     `admin/list?page=${page}&name=${search}`,
//     ["admins", page, search]
//   );
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const [adminId, setAdminId] = useState<number | null>(null);
//   const { mutate } = useApiMutation<{ message: string }>(
//     `admin/${adminId}`,
//     "DELETE",
//     ["deleteAdmin"],
//     {
//       onSuccess: (data) => {
//         queryClient.invalidateQueries({
//           queryKey: ["admins"],
//         });
//         toast({
//           title: t("adminDeleted"),
//           description: data?.message,
//         });
//       },
//     }
//   );
//   const { mutate: exportAdmins } = useFileMutation(`admin/export`, [
//     "exportAdmins",
//   ]);
//
//   const adminColumns: ColumnDef<Admin>[] = [
//     // {
//     //   accessorKey: "name",
//     //   header: t("adminName"),
//     //   cell: ({ row }) => (
//     //     <div className="flex items-center space-x-2">
//     //       <Link href={`admins/${row.original.id}`} className="font-medium hover:underline">
//     //         {tName("name", { ...row?.original })}
//     //       </Link>
//     //       {row.original.isMainAdmin && (
//     //         <Badge variant="secondary">Main Admin</Badge>
//     //       )}
//     //     </div>
//     //   ),
//     // },
//     {
//       accessorKey: "email",
//       header: t("Email"),
//       cell: ({ row }) => (
//         <Link href={`admins/${row.original.id}`} className="text-muted-foreground hover:underline">
//           {row.getValue("email")}
//         </Link>
//       ),
//     },
//     {
//       accessorKey: "phone_number",
//       header: t("Phone_number"),
//       cell: ({ row }) => (
//         <span className="text-muted-foreground">
//           {row.getValue("phone_number")}
//         </span>
//       ),
//     },
//     {
//       header: t("action"),
//       cell: ({ row }) => (
//         <Dialog>
//           <DropdownMenu modal={false}>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                 <EllipsisVertical className="h-4 w-4" />
//                 <span className="sr-only">Open menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => router.push(`./admins/${row.original.id}`)}>
//                 {t("view")}
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => router.push(`./admins/edit/${row.original.id}`)}>
//                 {t("edit")}
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem asChild>
//                 <DialogTrigger className="w-full text-red-600">{t("delete")}</DialogTrigger>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>{tName("name", { ...row?.original })}</DialogTitle>
//               <DialogDescription>{row.original.email}</DialogDescription>
//             </DialogHeader>
//             <div className="py-4">{t("doYouDeleteAdmin")}</div>
//             <DialogFooter>
//               <DialogClose asChild>
//                 <Button variant="outline">{t("close")}</Button>
//               </DialogClose>
//               <Button
//                 variant="destructive"
//                 onClick={() => {
//                   setAdminId(row.original.id);
//                   mutate();
//                 }}
//               >
//                 {t("confirm")}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       ),
//     },
//   ];
//
//   return (
//     <div className="w-full space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">{t("admins")}</h1>
//           <p className="text-muted-foreground mt-2">
//             {t("adminDescription")}
//           </p>
//         </div>
//         <Link href={`./admins/create`}>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" /> {t("createadmin")}
//           </Button>
//         </Link>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>{t("adminList")}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-2">
//               <Input
//                 placeholder={t("filter")}
//                 value={search}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 className="max-w-sm"
//               />
//               <Button
//                 onClick={() => exportAdmins()}
//                 size="sm"
//                 variant="outline"
//               >
//                 <File className="mr-2 h-4 w-4" />
//                 <span>{t("export")}</span>
//               </Button>
//             </div>
//             <PaginationApi data={data?.pagination ?? null} setPage={setPage} />
//           </div>
//           <TableApi
//             data={data?.admins ?? null}
//             columns={adminColumns}
//             // className="border rounded-md"
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



"use client";

import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { File, Plus } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table";
import PaginationApi from "@/components/PaginationApi";
import { Input } from "@/components/ui/input";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import Admin from "@/types/admin";
import TableApi from "@/components/TableApi";
import { useState } from "react";
import useApiQuery from "@/lib/useApiQuery";
import AdminApi from "@/types/adminApi";
import useFileMutation from "@/lib/useFileMutation";
import { Badge } from "@/components/ui/badge";

export default function Admins() {
  const t = useTranslations("admins");
  const tName = useTranslations("names");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data } = useApiQuery<AdminApi>(
    `admin/list?page=${page}&name=${search}`,
    ["admins", page, search]
  );
  const { mutate: exportAdmins } = useFileMutation(`admin/export`, [
    "exportAdmins",
  ]);

  // const isMainAdmin = (admin: Admin) => admin.isMainAdmin;

  const adminColumns: ColumnDef<Admin>[] = [
    // {
    //   accessorKey: "name",
    //   header: t("adminName"),
    //   cell: ({ row }) => (
    //     <div className="flex items-center space-x-2">
    //       <Link href={`admins/${row.original.id}`} className="font-medium hover:underline">
    //         {isMainAdmin(row.original)
    //           ? tName("name", { ...row.original })
    //           : t("adminNameHidden")}
    //       </Link>
    //       {isMainAdmin(row.original) && (
    //         <Badge variant="secondary">Main Admin</Badge>
    //       )}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "name",
      header: t("adminName"),
      cell: ({ row }) => (
        <Link href={`admins/${row.original.id}`}>
          {tName("name", { ...row?.original })}
        </Link>
      ),
    },
    {
      accessorKey: "phone_number",
      header: t("Phone_number"),
      cell: ({ row }) => (
        <Link href={`admins/${row.original.id}`}>
          {row.getValue("phone_number")}
        </Link>
      ),
    },
    {
      accessorKey: "email",
      header: t("Email"),
      cell: ({ row }) => (
        <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${row.getValue("email")}`}>
          {row.getValue("email")}
        </Link>
      ),
    }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("admins")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("adminDescription")}
          </p>
        </div>
        <Link href={`./admins/create`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {t("createadmin")}
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("adminList")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder={t("filter")}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="max-w-sm"
              />
              <Button
                onClick={() => exportAdmins()}
                size="sm"
                variant="outline"
              >
                <File className="mr-2 h-4 w-4" />
                <span>{t("export")}</span>
              </Button>
            </div>
            <PaginationApi data={data?.pagination ?? null} setPage={setPage} />
          </div>
          <TableApi
            data={data?.admins ?? null}
            columns={adminColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
}



