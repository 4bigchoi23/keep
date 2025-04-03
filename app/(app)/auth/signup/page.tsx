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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import Keep from "@/components/app/keep";

export default function AuthSignUp() {
  return (
    <div className="central p-5 bg-no-repeat bg-center bg-cover">
      <Card className="w-full sm:max-w-[450px] dark:border-none dark:bg-black backdrop-blur-lg">
        <CardHeader>
          <div className="flex justify-center my-5"><Keep /></div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CardTitle>
            <h1 className="text-2xl">Create an account</h1>
          </CardTitle>
          <CardDescription>
            <p>Enter your email below to create your account</p>
          </CardDescription>
        </CardContent>
        <CardContent>
          <form action="">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label className="" htmlFor="email">Email</Label>
                <Input name="email" id="email" placeholder="" />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="password">Password</Label>
                <Input name="password" id="password" placeholder="" />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="username">Username</Label>
                <Input name="username" id="username" placeholder="" />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="name">Name</Label>
                <Input name="name" id="name" placeholder="" />
              </div>
              <div className="grid gap-2">
                <Button type="submit">Create account</Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
}
