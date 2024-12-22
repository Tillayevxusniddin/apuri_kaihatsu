
// MuhammadSolih bilan qiligan

// "use client"
//
// import * as React from "react"
// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   Frame,
//   GalleryVerticalEnd,
//   Map,
//   PieChart,
//   Settings2,
//   SquareTerminal,
// } from "lucide-react"
//
// import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { url } from "inspector"
// import { useTranslations } from "next-intl"
// import {usePathname} from "@/navigation";
//
//
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
//       key: "dashboard", // Tarjimani olish uchun "key" qo'shildi
//       url: "/dashboard",
//       icon: SquareTerminal,
//       items: [
//         {
//           key: "messages", // "key" orqali tarjima qilish
//           url: "/messages",
//           parent: "/dashboard",
//         },
//         {
//           key: "charts", // "key" orqali tarjima qilish
//           url: "/charts",
//           parent: "/dashboard",
//         },
//         {
//           key: "students",
//           url: "/students",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "groups",
//           url: "/groups",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "parents",
//           url: "/parents",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "admins",
//           url: "/admins",
//           parent: "/dashboard",
//
//         },
//       ],
//     },
//     {
//       key: "forms",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           key: "form-page", // "key" orqali tarjima qilish
//           url: "/forms",
//           parent: "#",
//         },
//         {
//           key: "all-forms",
//           url: "/forms/list",
//           parent: "#",
//         },
//       ],
//     },
//     {
//       key: "introduction",
//       url: "/intro",
//       icon: BookOpen,
//       items: [
//         {
//           key: "introduction", // "key" orqali tarjima qilish
//           url: "/introduction",
//           parent: "/intro"
//         },
//         {
//           key: "get-started",
//           url: "/getstarted",
//           parent: "/intro"
//         },
//         {
//           key: "tutorials",
//           url: "/tutorial",
//           parent: "/intro"
//         },
//         {
//           key: "changelog",
//           url: "#",
//           parent: "/intro"
//         },
//       ],
//     },
//     {
//       key: "settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           key: "general", // "key" orqali tarjima qilish
//           url: "#",
//         },
//         {
//           key: "team",
//           url: "#",
//         },
//         {
//           key: "billing",
//           url: "#",
//         },
//         {
//           key: "limits",
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
//
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
// };
//
// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const t = useTranslations("nav");
//   const pathname = usePathname();
//
//   const getActiveState = (url: string, items: any[]): boolean => {
//     console.log("Current Pathname:", pathname, "Parent URL:", url, "Items:", items);
//
//     // Find the item whose URL matches the current pathname
//     const matchedItem = items?.find((item: { url: string }) => item?.url === pathname);
//
//     // Check if the parent of the matched item equals the given URL
//     return matchedItem?.parent === url;
//   };
//
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <TeamSwitcher teams={data.teams} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain
//           items={data.navMain.map((navItem) => ({
//             ...navItem,
//             title: t(navItem.key),  // Translate the title
//             isActive: getActiveState(navItem.url , navItem.items), // Set isActive based on the current pathname
//             items: navItem.items.map((item) => ({
//               ...item,
//               title: t(item.key), // Translate each item's title
//               isActive: pathname === item.url, // Set isActive for each item
//             })),
//           }))}
//         />
//         {/*<NavProjects projects={data.projects} />*/}
//       </SidebarContent>
//         {/*<SidebarFooter>*/}
//         {/*   <NavUser user={data.user} />*/}
//         {/*</SidebarFooter>*/}
//
//
//
//       <SidebarRail />
//     </Sidebar>
//   );
// }


// Alohida hook bilan qilingan
// "use client"
//
// import * as React from "react"
// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   Frame,
//   GalleryVerticalEnd,
//   Map,
//   PieChart,
//   Settings2,
//   SquareTerminal,
// } from "lucide-react"
//
// import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { url } from "inspector"
// import { useTranslations } from "next-intl"
// import {usePathname} from "@/navigation";
// import {useActiveState} from "@/hooks/useActiveState";
//
//
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "New School",
//       logo: GalleryVerticalEnd,
//       plan: "Management system",
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
//       key: "dashboard", // Tarjimani olish uchun "key" qo'shildi
//       url: "/dashboard",
//       icon: SquareTerminal,
//       items: [
//         {
//           key: "messages", // "key" orqali tarjima qilish
//           url: "/messages",
//           parent: "/dashboard",
//         },
//         {
//           key: "charts", // "key" orqali tarjima qilish
//           url: "/charts",
//           parent: "/dashboard",
//         },
//         {
//           key: "students",
//           url: "/students",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "groups",
//           url: "/groups",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "parents",
//           url: "/parents",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "admins",
//           url: "/admins",
//           parent: "/dashboard",
//
//         },
//       ],
//     },
//     {
//       key: "forms",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           key: "form-page", // "key" orqali tarjima qilish
//           url: "/forms",
//           parent: "#",
//         },
//         {
//           key: "all-forms",
//           url: "/forms/list",
//           parent: "#",
//         },
//       ],
//     },
//     {
//       key: "introduction",
//       url: "/intro",
//       icon: BookOpen,
//       items: [
//         {
//           key: "introduction", // "key" orqali tarjima qilish
//           url: "/introduction",
//           parent: "/intro"
//         },
//         {
//           key: "get-started",
//           url: "/getstarted",
//           parent: "/intro"
//         },
//         {
//           key: "tutorials",
//           url: "/tutorial",
//           parent: "/intro"
//         },
//         {
//           key: "changelog",
//           url: "#",
//           parent: "/intro"
//         },
//       ],
//     },
//     {
//       key: "settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           key: "general", // "key" orqali tarjima qilish
//           url: "#",
//         },
//         {
//           key: "team",
//           url: "#",
//         },
//         {
//           key: "billing",
//           url: "#",
//         },
//         {
//           key: "limits",
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
//
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
// };
//
// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const t = useTranslations("nav");
//   const { pathname, getActiveState } = useActiveState();
//
//
//
//
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <TeamSwitcher teams={data.teams} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain
//           items={data.navMain.map((navItem) => ({
//             ...navItem,
//             title: t(navItem.key),  // Translate the title
//             isActive: getActiveState(navItem.url , navItem.items), // Set isActive based on the current pathname
//             items: navItem.items.map((item) => ({
//               ...item,
//               title: t(item.key), // Translate each item's title
//               isActive: pathname === item.url, // Set isActive for each item
//             })),
//           }))}
//         />
//         {/*<NavProjects projects={data.projects} />*/}
//       </SidebarContent>
//         {/*<SidebarFooter>*/}
//         {/*   <NavUser user={data.user} />*/}
//         {/*</SidebarFooter>*/}
//       <SidebarRail />
//     </Sidebar>
//   );
// }




// "use client"
//
// import * as React from "react"
// import { AudioWaveform, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, SquareTerminal } from 'lucide-react'
//
// import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { url } from "inspector"
// import { useTranslations } from "next-intl"
// import {usePathname} from "@/navigation";
// import {useActiveState} from "@/hooks/useActiveState";
//
//
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
//       key: "dashboard", // Tarjimani olish uchun "key" qo'shildi
//       url: "/dashboard",
//       icon: SquareTerminal,
//       items: [
//         {
//           key: "messages", // "key" orqali tarjima qilish
//           url: "/messages",
//           parent: "/dashboard",
//         },
//         {
//           key: "charts", // "key" orqali tarjima qilish
//           url: "/charts",
//           parent: "/dashboard",
//         },
//         {
//           key: "students",
//           url: "/students",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "groups",
//           url: "/groups",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "parents",
//           url: "/parents",
//           parent: "/dashboard",
//
//         },
//         {
//           key: "admins",
//           url: "/admins",
//           parent: "/dashboard",
//
//         },
//       ],
//     },
//     {
//       key: "forms",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           key: "form-page", // "key" orqali tarjima qilish
//           url: "/forms",
//           parent: "#",
//         },
//         {
//           key: "all-forms",
//           url: "/forms/list",
//           parent: "#",
//         },
//       ],
//     },
//     {
//       key: "introduction",
//       url: "/intro",
//       icon: BookOpen,
//       items: [
//         {
//           key: "introduction", // "key" orqali tarjima qilish
//           url: "/introduction",
//           parent: "/intro"
//         },
//         {
//           key: "get-started",
//           url: "/getstarted",
//           parent: "/intro"
//         },
//         {
//           key: "tutorials",
//           url: "/tutorial",
//           parent: "/intro"
//         },
//         {
//           key: "changelog",
//           url: "#",
//           parent: "/intro"
//         },
//       ],
//     },
//     {
//       key: "settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           key: "general", // "key" orqali tarjima qilish
//           url: "#",
//         },
//         {
//           key: "team",
//           url: "#",
//         },
//         {
//           key: "billing",
//           url: "#",
//         },
//         {
//           key: "limits",
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
//
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
// };
//
// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const t = useTranslations("nav");
//   const { pathname, getActiveState } = useActiveState();
//
//
//
//
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <TeamSwitcher teams={data.teams} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain
//           items={data.navMain.map((navItem) => ({
//             ...navItem,
//             title: t(navItem.key),  // Translate the title
//             isActive: navItem.items.some(item => pathname.startsWith(item.url)), // Set isActive based on the current pathname
//             items: navItem.items.map((item) => ({
//               ...item,
//               title: t(item.key), // Translate each item's title
//               isActive: pathname.startsWith(item.url), // Set isActive for each item
//             })),
//           }))}
//         />
//         {/*<NavProjects projects={data.projects} />*/}
//       </SidebarContent>
//       {/*<SidebarFooter>*/}
//       {/*   <NavUser user={data.user} />*/}
//       {/*</SidebarFooter>*/}
//
//
//
//       <SidebarRail />
//     </Sidebar>
//   );

// }





"use client"

import * as React from "react"
import { AudioWaveform, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, SquareTerminal, CircleUser } from 'lucide-react'

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useTranslations } from "next-intl"
import { usePathname } from "@/navigation"
import { useActiveState } from "@/hooks/useActiveState"
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
import { signOut, useSession } from "next-auth/react"

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
          parent: "/dashboard",
        },
        {
          key: "charts", // "key" orqali tarjima qilish
          url: "/charts",
          parent: "/dashboard",
        },
        {
          key: "students",
          url: "/students",
          parent: "/dashboard",

        },
        {
          key: "groups",
          url: "/groups",
          parent: "/dashboard",

        },
        {
          key: "parents",
          url: "/parents",
          parent: "/dashboard",

        },
        {
          key: "admins",
          url: "/admins",
          parent: "/dashboard",

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
          parent: "#",
        },
        {
          key: "all-forms",
          url: "/forms/list",
          parent: "#",
        },
      ],
    },
    {
      key: "introduction",
      url: "/intro",
      icon: BookOpen,
      items: [
        {
          key: "introduction", // "key" orqali tarjima qilish
          url: "/introduction",
          parent: "/intro"
        },
        {
          key: "get-started",
          url: "/getstarted",
          parent: "/intro"
        },
        {
          key: "tutorials",
          url: "/tutorial",
          parent: "/intro"
        },
        {
          key: "changelog",
          url: "#",
          parent: "/intro"
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
  const t = useTranslations("nav")
  const tApp = useTranslations("app")
  const tName = useTranslations("names")
  const { pathname, getActiveState } = useActiveState()
  const { data: session } = useSession()

  const user = session?.user

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((navItem) => ({
            ...navItem,
            title: t(navItem.key),
            isActive: getActiveState(navItem.url, navItem.items),
            items: navItem.items.map((item) => ({
              ...item,
              title: t(item.key),
              isActive: pathname === item.url,
            })),
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-4 p-4 group-data-[collapsible=icon]:hidden">
          {/*<LanguageSelect />*/}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="w-full justify-start">
                <CircleUser className="mr-2 h-4 w-4" />
                {user && tName("name", { ...user })}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <div>{tApp("account")}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{tApp("settings")}</DropdownMenuItem>
              <DropdownMenuItem>{tApp("support")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                {tApp("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}













