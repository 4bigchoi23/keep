'use client';

// import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LucideMail,
  LucideHouse,
} from "lucide-react";

import Keep from "@/components/app/keep";

import { redirect } from 'next/navigation';

export default function AuthVerifyRequest() {
  return (
    <div className="central p-5 bg-no-repeat bg-center bg-cover">
      <Card className="w-full sm:max-w-[450px] dark:border-none dark:bg-black backdrop-blur-lg">
        <CardHeader>
          <div className="flex justify-center my-5"><Keep /></div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 text-center">
          <CardTitle className="flex flex-col justify-center items-center gap-2 text-xl">
            <LucideMail /> 
            <h1>Check your email</h1>
          </CardTitle>
          <CardDescription className="flex flex-col justify-center items-center gap-3 text-base">
            <p>A sign in link has been sent to your email address.</p>
          </CardDescription>
          <div>
            <Button onClick={() => redirect('/')}>
              <LucideHouse /> Go home
            </Button>
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
}
