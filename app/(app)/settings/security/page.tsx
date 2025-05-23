'use client';

// import Link from 'next/link';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import {
  LucideLoader2,
  LucideShieldUser,
} from "lucide-react";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

// import { PrismaClient } from '@/prisma/client';
// const prisma = new PrismaClient();

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    old_password: z
      .string(),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    cfm_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine((data) => data.new_password === data.cfm_password, {
    message: "Passwords don't match",
    path: ["cfm_password"],
  });

export default function SettingsSecurity() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      cfm_password: "",
    },
  });

  const [onPending, setOnPending] = useState(false);
  useEffect(() => {
  }, []);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setOnPending(true);
    try {
      const res = await fetch('/api/user/me?security', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
        await update({
          ...session,
          user: await fetch('/api/user/me').then(res => res.json()),
        });
        router.refresh();
      } else {
        toast.error("Failed to updated profile.", {
          description: `[${res.status}][${res.statusText}] ${result.error}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setOnPending(false);
  };

  return (
    <div>
      <div className="border-b pb-3 mb-5">
        <h2 className="text-2xl">Security</h2>
        <div className="text-sm/5 text-muted-foreground/50">
          Strengthen your account by ensuring your password is strong.
        </div>
      </div>
      <div className="mt-5 mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="old_password"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cfm_password"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={onPending}>
              {!onPending 
                ? <><LucideShieldUser /> Update password</>
                : <><LucideLoader2 className="animate-spin" /> Processing...</>
              }
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
