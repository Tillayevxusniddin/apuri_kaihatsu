import React from "react";
import {
  Home,
  LineChart,
  Users,
  BookCheck,
  GraduationCap,
  Contact,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { onlyAdminPathNameRegex } from "@/middleware";
import NavLink from "./NavLink";
import { useTranslations } from "next-intl";
import { User } from "next-auth";

const navLinks = [
  {
    id: 1,
    href: "/dashboard",
    icon: Home,
    nameKey: "dashboard",
  },
  {
    id: 2,
    href: "/forms/list",
    icon: LineChart,
    nameKey: "all-forms",
    // badge: 0,
  },
  {
    id:3,
    href: "/forms",
    icon: BookCheck,
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
  /* {
    id: 9,
    href: "#",
    icon: LineChart,
    nameKey: "analytics",
  },*/
];
const NavLinks = ({ user }: { user: User }) => {
  const t = useTranslations("nav");

  return (
    <>
      {navLinks.map((link) => {
        const isAdminPath = onlyAdminPathNameRegex.test(link.href);
        if (isAdminPath && user?.role !== "admin") {
          return null;
        }
        return (
          <NavLink
            key={link.id}
            href={link.href}
            Icon={link.icon}
            name={t(link.nameKey)}
            badge={link?.badge}
          />
        );
      })}
    </>
  );
};

export default NavLinks;
