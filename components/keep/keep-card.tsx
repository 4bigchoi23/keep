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

export default async function KeepCard(props: {
  data: {
    id: number,
    title: string,
    description: string,
    url: string,
    ogimage: string,
    favicon: string,
    createdAt: string,
    updatedAt: string,
    user: {
      username: string,
      name: string,
      image: string,
    },
  }
}) {
  const ogimage = `bg-[url(${props.data.ogimage})]`;
  // const favicon = `bg-[url(https://www.google.com/s2/favicons?sz=16&domain=${props?.data?.url?.split('/')?.[2]})]`;
  const favicon = `bg-[url(https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=16&url=${encodeURIComponent(props.data.url)})]`;

  return(
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
            {props.data.title}
          </div>
        </CardTitle>
        <CardDescription className="overflow-hidden">
          <div className="flex justify-start items-center gap-2">
            <div className="flex-none relative size-5 overflow-hidden flex justify-center items-center">
              <div className={`absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover bg-center ${favicon}`}></div>
              <LucideEarth size={20} className="opacity-50" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate">{props.data.url}</div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm/4 text-neutral-400 dark:text-neutral-600 line-clamp-3">
        {props.data.description}
      </CardContent>
      <CardFooter className="mt-auto">
        <hr className="w-full my-2" />
      </CardFooter>
      <CardFooter>
        <div className="w-full flex items-center justify-start gap-3 truncate">
          <Avatar className="shrink-0">
            <AvatarImage src={props.data.user.image||`/pfimg.svg`} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <div className="text-base/4 font-medium text-neutral-600 dark:text-neutral-400">
              {props.data.user.name}
            </div>
            <div className="text-xs/4 text-neutral-600 dark:text-neutral-400 truncate">
              {new Date(props.data.createdAt).toUTCString()}
            </div>
          </div>
          <LucideTrash2 size={16} className="ml-auto text-red-500" />
        </div>
      </CardFooter>
    </Card>
  );
}
