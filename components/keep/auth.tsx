"use client";

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
import { LucideCircleUser } from "lucide-react";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <Button
          className="cursor-pointer"
          onClick={() => signIn()}
        >
          <LucideCircleUser />
          Sign In
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar>
              <AvatarImage src={session?.user?.image ?? '/pfimg.svg'} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-38" align="end" sideOffset={10}>
            <DropdownMenuLabel className="cursor-default">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link 
                  href={`/${session?.user?.username ?? ''}`}
                  className="cursor-pointer" 
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  href="/settings/profile" 
                  className="cursor-pointer" 
                >
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer" 
              onClick={() => signOut()}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
