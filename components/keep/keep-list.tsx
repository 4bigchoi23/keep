// import Link from 'next/link';
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import KeepCard from '@/components/keep/keep-card';

export default async function KeepList() {
  return(
    <>
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            [...Array(6)].map((obj, key) => {
              const ogimage = key%4 === 1 ? `` : `bg-[url(https://as2.ftcdn.net/v2/jpg/11/45/30/23/1000_F_1145302374_76c8gXDXUGPH1yKMAQobG1NYd7fLHq8i.jpg)]`;
              const favicon = key%2 === 0 ? `` : `bg-[url(https://www.google.com/s2/favicons?sz=16&domain=www.apple.com)]`;
              return(
                <div key={key}>
                  <Card className="gap-3 h-full">
                    <CardHeader className="pt-0">
                      <div className="relative aspect-video overflow-hidden rounded-md flex justify-center items-center bg-neutral-100 dark:bg-neutral-950">
                        <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center ${ogimage}`}></div>
                        <LucideImageOff className="text-neutral-300 dark:text-neutral-700" />
                      </div>
                    </CardHeader>
                    <CardHeader>
                      <CardTitle className="overflow-hidden">
                        <div className="text-base/5 line-clamp-2">
                          Lorem ipsum dolor 
                          {key%4===0?`sit amet consectetur, adipisicing elit.`:``}
                        </div>
                      </CardTitle>
                      <CardDescription className="overflow-hidden">
                        <div className="flex justify-start items-center gap-2">
                          <div className="flex-none relative size-5 overflow-hidden flex justify-center items-center">
                            <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center ${favicon}`}></div>
                            <LucideEarth size={20} className="opacity-50" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="truncate">https://example.com/path/to/page.html</div>
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm/4 text-neutral-400 dark:text-neutral-600 line-clamp-3">
                      Lorem ipsum dolor, sit amet 
                      {key%2===1?`consectetur adipisicing elit. Mollitia dolor aut adipisci magnam.`:``}
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <hr className="w-full my-2" />
                    </CardFooter>
                    <CardFooter>
                      <div className="w-full flex items-center justify-start gap-3 truncate">
                        <Avatar className="shrink-0">
                          <AvatarImage src="/pfimg.svg" />
                          <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col truncate">
                          <div className="text-base/4 font-medium text-neutral-600 dark:text-neutral-400">
                            You
                          </div>
                          <div className="text-xs/4 text-neutral-600 dark:text-neutral-400 truncate">
                            {new Date().toUTCString()}
                          </div>
                        </div>
                        <LucideTrash2 size={16} className="ml-auto text-red-500" />
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              )
            })
          }
          {
            [...Array(6)].map((obj, key) => {
              return(
                <div key={key}>
                  <KeepCard 
                    data={
                      {
                        id: parseInt(`${key}`), 
                        title: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`, 
                        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia dolor aut adipisci magnam.`, 
                        url: `https://www.youtube.com/watch?v=V4D6ua-SDxg`, 
                        ogimage: `https://as2.ftcdn.net/v2/jpg/11/45/30/23/1000_F_1145302374_76c8gXDXUGPH1yKMAQobG1NYd7fLHq8i.jpg`, 
                        favicon: ``, 
                        createdAt: new Date().toUTCString(), 
                        updatedAt: new Date().toUTCString(), 
                        user: {
                          username: `johndoe`, 
                          name: `John Doe`, 
                          image: ``,
                        },
                      }
                    }
                  />
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="my-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
