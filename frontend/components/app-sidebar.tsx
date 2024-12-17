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
      url: "/name",
      icon: BookOpen,
      items: [
        {
          key: "introduction", // "key" orqali tarjima qilish
          url: "/introduction",
          parent: "/name"
        },
        {
          key: "get-started",
          url: "#",
          parent: "/name"
        },
        {
          key: "tutorials",
          url: "#",
          parent: "/name"
        },
        {
          key: "changelog",
          url: "#",
          parent: "/name"
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

  const getActiveState = (url: string, items: any[]): boolean => {
    console.log("Current Pathname:", pathname, "Parent URL:", url, "Items:", items);

    // Find the item whose URL matches the current pathname
    const matchedItem = items?.find((item: { url: string }) => item?.url === pathname);

    // Check if the parent of the matched item equals the given URL
    return matchedItem?.parent === url;
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
            isActive: getActiveState(navItem.url , navItem.items), // Set isActive based on the current pathname
            items: navItem.items.map((item) => ({
              ...item,
              title: t(item.key), // Translate each item's title
              isActive: false, // Set isActive for each item
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