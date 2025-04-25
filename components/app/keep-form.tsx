'use client';

// import Link from 'next/link';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  LucideChevronUp,
  LucideChevronDown,
  LucideBookmark,
  LucideLoader2,
} from "lucide-react";

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  url: z
    .string()
    .url({ message: "Invalid URL." })
    .trim(),
  title: z
    .string()
    .min(1, { message: 'Title is required.'}),
  description: z.string(),
  image: z.string(),
});

export default function KeepForm() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      image: "",
    },
  });

  const [isPasting, setIsPasting] = useState(false);
  const [onPending, setOnPending] = useState(false);
  const [spreadOut, setSpreadOut] = useState(false);

  useEffect(() => {
    if (isPasting) {
      const { unsubscribe } = form.watch((value) => {
        const url = value.url;
        if (url && url.indexOf('http') === 0) {
          setOnPending(true);
          fetch(`/api/draw?q=${encodeURIComponent(url)}`).then((response) => {
            response.json().then((res) => {
              form.setValue('title', res.title);
              form.setValue('description', res.description);
              form.setValue('image', res.image);
              setOnPending(false);
            });
          });
        }
        setIsPasting(false);
      })
      return () => unsubscribe();
    }
  }, [form, isPasting]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setOnPending(true);
    try {
      const res = await fetch('/api/keep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });
      const result = await res.json();
      if (res.ok) {
        form.reset();
        toast.success(result.message, {
          duration: 2500,
          onAutoClose: (t) => {
            toast.dismiss(t.id);
            [...params.keys()].map(k => params.delete(k));
            replace(`${pathname}`);
          },
        });
      } else {
        toast.error("Failed to create Keep.", {
          description: `[${res.status}][${res.statusText}] ${result.error}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setOnPending(false);
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <div className="flex gap-4">
              <div className="flex flex-col flex-1 gap-1">
                <CardTitle>Keep your bookmark!</CardTitle>
                <CardDescription className="leading-4">Paste the website address into the URL field.</CardDescription>
              </div>
              <div className="flex-none">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setSpreadOut(!spreadOut)} 
                >
                  {spreadOut 
                    ? <LucideChevronUp />
                    : <LucideChevronDown />
                  }
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`${!spreadOut && 'sr-only'}`}>URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="URL (Start with http:// or https://)" 
                      {...field} 
                      onPaste={() => setIsPasting(true)} 
                      disabled={onPending} 
                    />
                  </FormControl>
                  <FormMessage className={`${!spreadOut && 'sr-only'}`} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`${!spreadOut && 'sr-only'}`}>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Title" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className={`${!spreadOut && 'sr-only'}`} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`${!spreadOut && 'sr-only'}`}>Description</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Description" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className={`${!spreadOut && 'sr-only'}`} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`${!spreadOut && 'sr-only'}`}>Image</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Image" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className={`${!spreadOut && 'sr-only'}`} />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="submit" 
              accessKey="s" 
              disabled={onPending}
            >
              {!onPending 
                ? <LucideBookmark />
                : <LucideLoader2 className="animate-spin" />
              }
              Submit <Badge className="bg-muted-foreground/25 text-muted/75"><kbd>Alt</kbd> + <kbd>S</kbd></Badge>
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.reset()} 
              disabled={onPending} 
            >
              Reset
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
