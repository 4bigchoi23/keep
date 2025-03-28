// import Link from 'next/link';
import KeepForm from "@/components/keep/keep-form";
import KeepList from '@/components/keep/keep-list';

export default function Home() {
  return (
    <div className="section">
      <div className="my-5">
        <KeepForm />
      </div>

      <div className="my-5">
        <KeepList />
      </div>
    </div>
  );
}
