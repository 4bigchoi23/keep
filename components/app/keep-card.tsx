'use client';

// import Link from 'next/link';
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
  LucideImageOff,
  LucideEarth,
  LucideTrash2,
} from "lucide-react";

export default function KeepCard() {
  const animate = true && 'animate-pulse';

  return(
    <Card className="gap-3 h-full hover:bg-(--card)/50">
      <CardHeader className="pt-0">
        <div className="relative aspect-video overflow-hidden rounded-md flex justify-center items-center bg-neutral-100 dark:bg-neutral-950">
          <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url()` }}></div>
          <LucideImageOff className="text-neutral-300 dark:text-neutral-700" />
        </div>
      </CardHeader>
      <CardHeader className={`${animate}`}>
        <CardTitle className="overflow-hidden">
          <div className="text-base/5 line-clamp-3">
            <a 
              href="" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-500 hover:underline" 
              onClick={(e) => e.preventDefault()}
            >
              {" "}
              <div className="flex flex-col gap-1">
                <div className="w-3/3 h-4 rounded bg-foreground/25"></div>
                <div className="w-1/3 h-4 rounded bg-foreground/25"></div>
              </div>
            </a>
          </div>
        </CardTitle>
        <CardDescription className="overflow-hidden">
          <div className="flex justify-start items-center gap-2">
            <div className="flex-none relative size-5 overflow-hidden flex justify-center items-center">
              <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url()` }}></div>
              <LucideEarth size={20} className="opacity-100" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate">
                <a 
                  href="" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:underline" 
                  onClick={(e) => e.preventDefault()} 
                >
                  {" "}
                  <div className="flex flex-col gap-1">
                    <div className="w-5/5 h-3 rounded bg-foreground/25"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className={`${animate}`}>
        <div className="text-sm/4 text-neutral-500 line-clamp-5">
          {" "}
          <div className="flex flex-col gap-1">
            <div className="w-5/5 h-3 rounded bg-foreground/10"></div>
            <div className="w-5/5 h-3 rounded bg-foreground/10"></div>
            <div className="w-3/5 h-3 rounded bg-foreground/10"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <hr className="w-full my-2" />
      </CardFooter>
      <CardFooter className={`${animate}`}>
        <div className="w-full flex items-center justify-start gap-3 truncate">
          <div className="avatar" style={{ backgroundImage: `url(/pfimg.svg)` }}></div>
          <div className="flex flex-col gap-1 truncate w-full">
            <div className="text-sm/3 font-medium text-neutral-600 dark:text-neutral-400">
              {" "}
              <div className="flex flex-col gap-1">
                <div className="w-2/5 h-3 rounded bg-foreground/25"></div>
              </div>
            </div>
            <div className="text-xs/3 text-neutral-600 dark:text-neutral-400 truncate">
              {" "}{/* {new Date().toUTCString()} */}
              <div className="flex flex-col gap-1">
                <div className="w-5/5 h-3 rounded bg-foreground/15"></div>
              </div>
            </div>
          </div>
          {(true) &&
            <Button 
              variant="link" 
              size="icon" 
              className="ml-auto text-red-500" 
              onClick={(e) => e.preventDefault()} 
            >
              <LucideTrash2 size={16} />
            </Button>
          }
        </div>
      </CardFooter>
    </Card>
  );
}
