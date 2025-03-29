// import Link from 'next/link';
import { auth } from "@/auth";
import KeepList from '@/components/keep/keep-list';
import {
  LucideCircleUser,
  LucideMail,
  LucideEarth,
} from "lucide-react";

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const session = await auth();
  return (
    <div>
      <div className="border-b bg-linear-[130deg,var(--accent),var(--primary-foreground),var(--accent)]">
        <div className="section text-center">
          <div className="my-5 text-4xl">
            {username}&apos;s profile
          </div>
          <div className="text-sm/5 text-neutral-500">
            {session?.user?.bio ?? 'Bio, Bio, Bio!'}
          </div>
          <hr className="my-5" />
          <div className="my-5 md:flex gap-5 justify-center items-center">
            <div className="flex gap-2 justify-center items-center">
              <div><LucideCircleUser size={16} /></div>
              <div>{session?.user?.name ?? 'John Doe'}</div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div><LucideMail size={16} /></div>
              <div>{session?.user?.email ?? 'test@email.me'}</div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div><LucideEarth size={16} /></div>
              <div>{session?.user?.url ?? 'https://example.com'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <KeepList />
      </div>
    </div>
  );
}
