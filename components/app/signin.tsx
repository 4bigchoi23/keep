'use client';

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LucideCircleUser } from "lucide-react";

export default function SignInButton() {
  return (
    <Button
      className=""
      onClick={() => signIn()}
    >
      <LucideCircleUser />
      Sign In
    </Button>
  );
}
