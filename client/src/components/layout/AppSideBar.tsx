"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  IconMessage,
  IconSettings,
  IconPlus,
  IconTrash,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useState } from "react";
import { motion } from "motion/react";

interface AppSideBarProps {
  className?: string;
}

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
}

// Mock chat history data - replace with real data from your backend
const mockChatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "How to implement authentication",
    timestamp: new Date(2024, 0, 15),
  },
  { id: "2", title: "React best practices", timestamp: new Date(2024, 0, 14) },
  {
    id: "3",
    title: "Database optimization tips",
    timestamp: new Date(2024, 0, 13),
  },
  { id: "4", title: "API design patterns", timestamp: new Date(2024, 0, 12) },
  {
    id: "5",
    title: "TypeScript advanced features",
    timestamp: new Date(2024, 0, 11),
  },
];

function ChatHistorySection() {
  return null;
}

function UserSection() {
  const { user } = useUser();

  return (
    <div className="flex justify-start pl-2 p-2">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
          },
        }}
      />
    </div>
  );
}

export default function AppSideBar({ className }: AppSideBarProps) {
  return (
    <div className={cn("fixed left-0 top-0 h-full z-40 w-16", className)}>
      <div className="flex flex-col h-full bg-black border-r border-zinc-700">
        <div className="flex flex-col items-center justify-between h-full py-4">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/icons/context0_logo_cropped.jpeg"
              alt="Context0 Logo"
              width={40}
              height={40}
              className="rounded-md shrink-0"
            />
          </div>

          {/* User Section at Bottom */}
          <UserSection />
        </div>
      </div>
    </div>
  );
}
