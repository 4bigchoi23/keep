'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
 
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
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be no more than 20 characters." })
    .toLowerCase()
    .trim(),
});

export default function SettingsAccount() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  return (
    <div>
      <div className="border-b pb-3 mb-5">
        <h2 className="text-2xl">Account</h2>
        <div className="text-sm/5 text-neutral-500 dark:text-neutral-600">Hi, There!</div>
      </div>
      <div className="mt-5 mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                    Make sure it&apos;s at least <b>3</b> characters and at most <b>20</b> characters 
                    including a number and a upper/lower case letter and a hyphen. 
                    However, do not start the first character with an hyphen.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update username</Button>
          </form>
        </Form>
      </div>
      <div className="border-b mb-5 pb-3 mt-8">
        <h2 className="text-2xl text-red-500">Delete account</h2>
        <div className="text-sm/5 text-neutral-500 dark:text-neutral-600">Once you delete your account, there is no going back. Please be certain.</div>
      </div>
      <div className="mt-5 mb-8">
        <div className="w-2/3 space-y-6">
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="userId">UserID</Label>
              <Input type="text" id="userId" placeholder="" className="w-full min-h-0" value="" readOnly />
            </div>
            <p className="text-muted-foreground text-sm">
              The bookmarks you have created will not be automatically deleted. 
              If you wish to delete them, please delete the bookmarks first and then delete your account.
            </p>
          </div>
          <Button className="bg-red-500 text-white hover:bg-red-500/75 hover:text-white/75">Delete your account</Button>
        </div>
      </div>
    </div>
  );
}
