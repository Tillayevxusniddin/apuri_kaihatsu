"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { url } from "inspector"
import { useTranslations } from "next-intl"
import {usePathname} from "@/navigation";

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "dashboard",
//       url: "/dashboard",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "Messages",
//           url: "/messages",
//         },
//         {
//           title: "Students",
//           url: "/students",
//         },
//         {
//           title: "Groups",
//           url: "/groups",
//         },
//         {
//           title: "Parents",
//           url:"/parents",
//         },
//         {
//           title:"Admins",
//           url:"/admins",
//         }
//       ],
//     },
//     {
//       title: "Form",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Form-page",
//           url: "/forms",
//         },
//         {
//           title: "All-forms",
//           url: "/forms/list",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      key: "dashboard", // Tarjimani olish uchun "key" qo'shildi
      url: "/dashboard",
      icon: SquareTerminal,
      items: [
        {
          key: "messages", // "key" orqali tarjima qilish
          url: "/messages",
        },
        {
          key: "students",
          url: "/students",
        },
        {
          key: "groups",
          url: "/groups",
        },
        {
          key: "parents",
          url: "/parents",
        },
        {
          key: "admins",
          url: "/admins",
        },
      ],
    },
    {
      key: "forms",
      url: "#",
      icon: Bot,
      items: [
        {
          key: "form-page", // "key" orqali tarjima qilish
          url: "/forms",
        },
        {
          key: "all-forms",
          url: "/forms/list",
        },
      ],
    },
    {
      key: "documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          key: "introduction", // "key" orqali tarjima qilish
          url: "#",
        },
        {
          key: "get-started",
          url: "#",
        },
        {
          key: "tutorials",
          url: "#",
        },
        {
          key: "changelog",
          url: "#",
        },
      ],
    },
    {
      key: "settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          key: "general", // "key" orqali tarjima qilish
          url: "#",
        },
        {
          key: "team",
          url: "#",
        },
        {
          key: "billing",
          url: "#",
        },
        {
          key: "limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,

    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const getActiveState = (url: string) => {
    console.log(pathname, url)
    return pathname === url;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((navItem) => ({
            ...navItem,
            title: t(navItem.key),  // Translate the title
            isActive: getActiveState(navItem.url), // Set isActive based on the current pathname
            items: navItem.items.map((item) => ({
              ...item,
              title: t(item.key), // Translate each item's title
              isActive: getActiveState(item.url), // Set isActive for each item
            })),
          }))}
        />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
        {/*<SidebarFooter>*/}
        {/*   <NavUser user={data.user} />*/}
        {/*</SidebarFooter>*/}
      <SidebarRail />
    </Sidebar>
  );
}