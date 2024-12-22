"use client";

import {
  Moon,
  MoonStar,
  MonitorCog,
  Sun,
  SunMedium,
  ScreenShare,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="items-center justify-center"
          ariaLabel="Toggle theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="hover:scale-125"
          onClick={() => setTheme("light")}
        >
          <SunMedium className="spinner" />
          <span className="pl-1">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group hover:scale-125"
          onClick={() => setTheme("dark")}
        >
          <Moon className="pr-2 group-hover:hidden" />
          <MoonStar className="animate-fade-in hidden min-w-[0] transform pr-2 ease-in-out group-hover:block group-hover:rotate-12" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group hover:scale-125"
          onClick={() => setTheme("system")}
        >
          <MonitorCog className="pr-2 group-hover:hidden" />
          <ScreenShare className="animate-fade-in hidden min-w-[0] transform pr-2 ease-in-out group-hover:block group-hover:rotate-12" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
