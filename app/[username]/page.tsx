// import Link from 'next/link';
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
  return (
    <div>
      <div className="border-b bg-linear-[130deg,var(--accent),var(--primary-foreground),var(--accent)]">
        <div className="section text-center">
          <div className="my-5 text-4xl">
            {username}&apos;s profile
          </div>
          <div className="text-sm/5 text-neutral-500">
            Bio, Bio, Bio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe itaque delectus eligendi at quia iure consequuntur dicta aspernatur tempore cum asperiores natus, obcaecati perferendis impedit consectetur totam expedita, tenetur harum!
          </div>
          <hr className="my-5" />
          <div className="my-5 md:flex gap-5 justify-center items-center">
            <div className="flex gap-2 justify-center items-center">
              <div><LucideCircleUser size={16} /></div>
              <div>John Doe</div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div><LucideMail size={16} /></div>
              <div>test@email.me</div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div><LucideEarth size={16} /></div>
              <div>https://example.com</div>
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
