import * as React from "react"
import { Plus } from "lucide-react"
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

// import { Calendars } from "@/components/calendars"
import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"


// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   calendars: [
//     {
//       name: "My Calendars",
//       items: ["Personal", "Work", "Family"],
//     },
//     {
//       name: "Favorites",
//       items: ["Holidays", "Birthdays"],
//     },
//     {
//       name: "Other",
//       items: ["Travel", "Reminders", "Deadlines"],
//     },
//   ],
// }

export async function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth/login');
  }
  const user = { email: data.user.email || 'test@email.com' };

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        {/* <Calendars calendars={data.calendars} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
