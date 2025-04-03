import { signOut } from "@/auth"

// import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  // CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LucideBadgeHelp,
} from "lucide-react";

import Keep from "@/components/app/keep";

export default function AuthSignOut() {
  return (
    <div className="central p-5 bg-no-repeat bg-center bg-cover">
      <Card className="w-full sm:max-w-[450px] dark:border-none dark:bg-black backdrop-blur-lg">
        <CardHeader>
          <div className="flex justify-center my-5"><Keep /></div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 text-center">
          <CardTitle className="flex flex-col justify-center items-center gap-2 text-xl">
            <LucideBadgeHelp />
            <h1>Are you sure you want to sign out?</h1>
          </CardTitle>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <Button type="submit" className="w-full">Sign out</Button>
          </form>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
}
