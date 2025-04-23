'use client';

import Link from 'next/link';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  LucideImageOff,
  LucideEarth,
  LucideTrash2,
} from "lucide-react";

import type { Session } from 'next-auth';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

export default function KeepItem({
  session,
  keep,
  each,
}: {
  session?: Session | null;
  keep?: {
    id?: number,
    userId?: string | null,
    title?: string | null,
    description?: string | null,
    url?: string | null,
    image?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    user?: {
      nick?: string | null,
      photo?: string | null,
      username?: string | null,
    },
  };
  each?: boolean | null;
}) {
  // const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
  }, []);

  async function onDelete(id: number) {
    try {
      const res = await fetch("/api/keep", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
        setIsDeleted(true);
      } else {
        toast.error("Failed to delete Keep.", {
          description: `[${res.status}][${res.statusText}] ${result.error}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <Card className={`group gap-3 hover:bg-(--card)/50 transition-all duration-500 ease-in-out ${each === undefined && 'h-full'} ${isDeleted && 'opacity-25 grayscale pointer-events-none'}`}>
      <CardHeader className="pt-0">
        <div className="relative aspect-video overflow-hidden rounded-md flex flex-col justify-center items-center bg-neutral-100 dark:bg-neutral-950">
          <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center transition-transform ease-in-out duration-250 group-hover:scale-125`} style={{ backgroundImage: `url(${keep?.image ?? ''})` }}></div>
          <LucideImageOff className="text-neutral-300 dark:text-neutral-700" />
        </div>
      </CardHeader>
      <CardHeader>
        <CardTitle className="overflow-hidden">
          <div className="text-base/5 line-clamp-3">
            <a 
              href={keep?.url ?? ''} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-500 hover:underline" 
            >
              {keep?.title ?? ''}
            </a>
          </div>
        </CardTitle>
        <CardDescription className="overflow-hidden">
          <div className="flex justify-start items-center gap-2">
            <div className="flex-none relative size-5 overflow-hidden flex flex-col justify-center items-center">
              <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=64&url=${encodeURIComponent(keep?.url ?? '')})` }}></div>
              <LucideEarth size={20} className="opacity-100" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate">
                <a 
                  href={keep?.url ?? ''} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:underline" 
                >
                  {keep?.url ?? ''}
                </a>
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm/4 text-neutral-500 line-clamp-5">
          {keep?.description ?? ''}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <hr className="w-full my-2" />
      </CardFooter>
      <CardFooter>
        <div className="w-full flex items-center justify-start gap-3 truncate">
          <Avatar className="shrink-0">
            <AvatarImage src={keep?.user?.photo ?? `/pfimg.svg`} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 truncate w-full">
            <div className="text-sm/3 font-medium text-neutral-600 dark:text-neutral-400 flex gap-2 items-center">
              {keep?.user?.username ? (
                <Link href={keep?.user?.username ? `/${keep?.user?.username}` : ``}>
                  <span className="hover:underline hover:text-green-600 dark:hover:text-green-400">{keep?.user?.nick ?? 'noname'}</span>
                </Link>
              ) : (
                <span>{keep?.user?.nick ?? 'noname'}</span>
              )}
            </div>
            <div className="text-xs/3 text-neutral-600 dark:text-neutral-400 truncate">
              {new Date(keep?.createdAt ?? '').toUTCString()}
            </div>
          </div>
          {(keep?.userId === session?.user?.id || session?.user?.role === 'admin') &&
            <Button 
              variant="link" 
              size="icon" 
              className="ml-auto text-red-500" 
              onClick={() => onDelete(keep?.id ?? 0)} 
              disabled={isDeleted} 
            >
              <LucideTrash2 size={16} />
            </Button>
          }
        </div>
      </CardFooter>
    </Card>
  );
}
