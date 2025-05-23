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

import KeepCard from '@/components/app/keep-card';

export default function KeepMock({
  count,
}: {
  count?: number;
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          [...Array(count ?? 6)].map((obj, key) => {
            return (
              <div key={key}>
                <KeepCard />
              </div>
            )
          })
        }
        {
          [...Array(0)].map((obj, key) => {
            return(
              <div key={key}>
                <Card className="gap-3 h-full">
                  <CardHeader className="pt-0">
                    <div className="relative aspect-video overflow-hidden rounded-md flex justify-center items-center bg-zinc-200 dark:bg-zinc-950">
                      <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(https://as2.ftcdn.net/v2/jpg/11/45/30/23/1000_F_1145302374_76c8gXDXUGPH1yKMAQobG1NYd7fLHq8i.jpg)` }}></div>
                      <LucideImageOff className="text-muted-foreground/25" />
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <CardTitle className="overflow-hidden">
                      <div className="text-base/5 line-clamp-3">
                        Lorem ipsum dolor sit amet consectetur, adipisicing.
                      </div>
                    </CardTitle>
                    <CardDescription className="overflow-hidden">
                      <div className="flex justify-start items-center gap-2">
                        <div className="flex-none relative size-5 overflow-hidden flex justify-center items-center">
                          <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=64&url=${encodeURIComponent('https://www.nextjs.org/')})` }}></div>
                          <LucideEarth size={20} className="opacity-0" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="truncate">https://example.com/path/to/page.html</div>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm/4 text-muted-foreground line-clamp-5">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia dolor aut adipisci.
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <hr className="w-full my-2" />
                  </CardFooter>
                  <CardFooter>
                    <div className="w-full flex items-center justify-start gap-3 truncate">
                      <div className="avatar" style={{ backgroundImage: `url(/pfimg.svg)` }}></div>
                      <div className="flex flex-col gap-1 truncate w-full">
                        <div className="text-sm/3 font-medium text-zinc-600 dark:text-zinc-400">
                          You
                        </div>
                        <div className="text-xs/3 text-zinc-600 dark:text-zinc-400 truncate">
                          {new Date().toUTCString()}
                        </div>
                      </div>
                      {(true) &&
                        <Button 
                          variant="link" 
                          size="icon" 
                          className="ml-auto text-red-500" 
                        >
                          <LucideTrash2 size={16} />
                        </Button>
                      }
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )
          })
        }
      </div>
    </>
  );
}
