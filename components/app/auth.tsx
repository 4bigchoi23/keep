'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LucideCircleUser,
  LucideUser,
  LucideSettings,
  LucideLogOut,
} from "lucide-react";

import { useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Auth() {
  const { data: session, status } = useSession();

  useEffect(() => {
  }, []);

  return (
    <>
      {
        !status || status === 'loading' ? (
          <>
            <div className="flex space-x-1 justify-center items-center dark:invert">
              <span className="sr-only">Loading...</span>
              <div className="w-2 h-2 bg-black/50 rounded-full animate-ping [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-black/50 rounded-full animate-ping [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-black/50 rounded-full animate-ping"></div>
            </div>
          </>
        ) : (
          !session ? (
            <Button
              className=""
              onClick={() => signIn()}
            >
              <LucideCircleUser />
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={session?.user?.photo ?? '/pfimg.svg'} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-38" align="end" sideOffset={10}>
                <DropdownMenuLabel className="cursor-default">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link 
                      href={`/${session?.user?.username ?? ''}`}
                      className="cursor-pointer" 
                    >
                      <LucideUser />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/settings/profile" 
                      className="cursor-pointer" 
                    >
                      <LucideSettings />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer" 
                  onClick={() => signOut()}
                >
                  <LucideLogOut />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        )
      }
    </>
  );
}
