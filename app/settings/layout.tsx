import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  LucideUser,
  LucideSettings,
  LucideShieldUser,
  LucideCornerRightDown,
  LucideCornerUpRight,
  LucideLayoutDashboard,
  LucideArrowRight,
} from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="section">
      <div className="flex gap-8 my-5">
        <div className="flex-none">
          <Card>
            <CardHeader>
              <div className="w-full flex items-center justify-start gap-3 truncate">
                <Avatar className="shrink-0">
                  <AvatarImage src="/pfimg.svg" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <div className="text-base/4 font-medium text-neutral-600 dark:text-neutral-400">
                    You
                  </div>
                  <div className="text-xs/4 text-neutral-600 dark:text-neutral-400 truncate">
                    Personal settings
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul>
                <li>
                  <Link 
                    href="/settings/profile"
                    className="flex gap-2 justify-start items-center px-2 py-1 rounded bg-none hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                  >
                    <LucideUser size={16} className="text-neutral-500" /> 
                    <span className="">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/settings/account"
                    className="flex gap-2 justify-start items-center px-2 py-1 rounded bg-none hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                  >
                    <LucideSettings size={16} className="text-neutral-500" /> 
                    <span className="">Account</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/settings/security"
                    className="flex gap-2 justify-start items-center px-2 py-1 rounded bg-none hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                  >
                    <LucideShieldUser size={16} className="text-neutral-500" /> 
                    <span className="">Security</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/settings/import"
                    className="flex gap-2 justify-start items-center px-2 py-1 rounded bg-none hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                  >
                    <LucideCornerRightDown size={16} className="text-neutral-500" /> 
                    <span className="">Import my bookmark</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/settings/export"
                    className="flex gap-2 justify-start items-center px-2 py-1 rounded bg-none hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                  >
                    <LucideCornerUpRight size={16} className="text-neutral-500" /> 
                    <span className="">Export my bookmark</span>
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full"><LucideLayoutDashboard /> Support <LucideArrowRight /></Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}