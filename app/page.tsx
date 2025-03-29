// import Link from 'next/link';
import { auth } from "@/auth";
import KeepDash from "@/components/keep/keep-dash";
import KeepForm from "@/components/keep/keep-form";
import KeepList from '@/components/keep/keep-list';

export default async function Home() {
  const session = await auth();

  return (
    <div className="section">
      <div className="my-5">
        {!session ? (
          <KeepDash />
        ) : (
          <KeepForm />
        )}
      </div>

      <div className="my-5">
        <KeepList />
      </div>
    </div>
  );
}
