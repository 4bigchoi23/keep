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

import { auth, signIn, signOut } from "@/auth";

import SignInButton from '@/components/app/signin';

export default async function Auth() {
  const session = await auth()

  return (
    <>
      {
        !session ? (
          /*
          <form
            action={async () => {
              "use server"
              await signIn()
            }}
          >
            <Button
              type="submit"
              className=""
            >
              <LucideCircleUser />
              Sign In
            </Button>
          </form>
          */
          <SignInButton />
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
              <DropdownMenuItem>
                <form
                  action={async () => {
                    "use server"
                    await signOut()
                  }}
                >
                  <Button 
                    type="submit" 
                    variant="ghost"
                    className="p-0 has-[>svg]:px-0 w-full h-auto flex justify-start items-center gap-2"
                  >
                    <LucideLogOut />
                    Sign Out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    </>
  );
}
