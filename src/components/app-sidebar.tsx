"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Cycle de vie",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytique",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projets",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Équipe",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
    {
      title: "Proposition",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
    {
      title: "Invites",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Aide",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Rechercher",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Bibliothèque de données",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Rapports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Assistant Word",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">DigitalQT</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
