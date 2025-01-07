// import React from "react";
// import {
//   Home,
//   LineChart,
//   Users,
//   BookCheck,
//   GraduationCap,
//   Contact,
//   MessageCircle,
//   ShieldCheck,
//   Pencil
// } from "lucide-react";
// import { onlyAdminPathNameRegex } from "@/middleware";
// import NavLink from "./NavLink";
// import { useTranslations } from "next-intl";
// import { User } from "next-auth";
//
// const navLinks = [
//   {
//     id: 1,
//     href: "/introduction",
//     icon: Home,
//     nameKey: "introduction",
//   },
//   {
//     id: 2,
//     href: "/forms/list",
//     icon: BookCheck,
//     nameKey: "all-forms",
//     // badge: 0,
//   },
//   {
//     id:3,
//     href: "/forms",
//     icon: Pencil,
//     nameKey: "forms",
//     badge: 0,
//   },
//   {
//     id: 4,
//     href: "/permissions",
//     icon: Users,
//     nameKey: "permissions",
//   },
//   {
//     id: 5,
//     href: "/messages",
//     icon: MessageCircle,
//     nameKey: "messages",
//   },
//   {
//     id: 6,
//     href: "/students",
//     icon: GraduationCap,
//     nameKey: "students",
//   },
//   {
//     id: 7,
//     href: "/groups",
//     icon: Users,
//     nameKey: "groups",
//   },
//   {
//     id: 8,
//     href: "/parents",
//     icon: Contact,
//     nameKey: "parents",
//   },
//   {
//     id: 9,
//     href: "/admins",
//     icon: ShieldCheck,
//     nameKey: "admins",
//   },
//    {
//     id: 10,
//     href: "/charts",
//     icon: LineChart,
//     nameKey: "analytics",
//   }
// ];
// const NavLinks = ({ user }: { user: User }) => {
//   const t = useTranslations("nav");
//
//   return (
//     <>
//       {navLinks.map((link) => {
//         const isAdminPath = onlyAdminPathNameRegex.test(link.href);
//         if (isAdminPath && user?.role !== "admin") {
//           return null;
//         }
//         return (
//           <NavLink
//             key={link.id}
//             href={link.href}
//             Icon={link.icon}
//             name={t(link.nameKey)}
//             badge={link?.badge}
//           />
//         );
//       })}
//     </>
//   );
// };
//
// export default NavLinks;


"use client"

import React from "react"
import { Home, LineChart, Users, BookCheck, GraduationCap, Contact, MessageCircle, ShieldCheck, Pencil, CircleUser } from 'lucide-react'
import { onlyAdminPathNameRegex } from "@/middleware"
import NavLink from "./NavLink"
import { useTranslations } from "next-intl"
import { User } from "next-auth"
import { Separator } from "@/components/ui/separator"
import LanguageSelect from "@/components/LanguageSelect"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const navLinks = [
  {
    id: 1,
    href: "/introduction",
    icon: Home,
    nameKey: "introduction",
  },
  {
    id: 2,
    href: "/forms/list",
    icon: BookCheck,
    nameKey: "all-forms",
  },
  {
    id: 3,
    href: "/forms",
    icon: Pencil,
    nameKey: "forms",
    badge: 0,
  },
  {
    id: 4,
    href: "/permissions",
    icon: Users,
    nameKey: "permissions",
  },
  {
    id: 5,
    href: "/messages",
    icon: MessageCircle,
    nameKey: "messages",
  },
  {
    id: 6,
    href: "/students",
    icon: GraduationCap,
    nameKey: "students",
  },
  {
    id: 7,
    href: "/groups",
    icon: Users,
    nameKey: "groups",
  },
  {
    id: 8,
    href: "/parents",
    icon: Contact,
    nameKey: "parents",
  },
  {
    id: 9,
    href: "/admins",
    icon: ShieldCheck,
    nameKey: "admins",
  },
  {
    id: 10,
    href: "/charts",
    icon: LineChart,
    nameKey: "analytics",
  }
]

const NavLinks = ({ user }: { user: User }) => {
  const t = useTranslations("nav")
  const tApp = useTranslations("app")
  const tName = useTranslations("names")

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        {navLinks.map((link) => {
          const isAdminPath = onlyAdminPathNameRegex.test(link.href)
          if (isAdminPath && user?.role !== "admin") {
            return null
          }
          return (
            <NavLink
              key={link.id}
              href={link.href}
              Icon={link.icon}
              name={t(link.nameKey)}
              badge={link?.badge}
            />
          )
        })}
      </div>

      <div className="mt-auto pt-4">
        <Separator className="mb-4"/>
        <div className="space-y-4 px-2">
          {/*<LanguageSelect />*/}
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="w-full justify-start">
                <CircleUser className="mr-2 h-4 w-4"/>
                {user && tName("name", {...user})}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <div>{tApp("account")}</div>
                  <div className="text-xs text-muted-foreground">
                    {user?.email}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              {/* Apply similar NavLink styles for dropdown items */}
              <DropdownMenuItem className="text-sm py-2 px-4 rounded-md">
                {tApp("settings")}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm py-2 px-4 rounded-md ">
                {tApp("support")}
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={() => signOut()} className="text-sm py-2 px-4 rounded-md">
                {tApp("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default NavLinks

