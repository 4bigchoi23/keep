'use client';

// import Link from 'next/link';
import { use } from 'react';
import { useSearchParams } from 'next/navigation';

export default function KeepNumber({
  totalItems,
}: {
  totalItems: Promise<number>;
}) {
  const searchParams = useSearchParams();
  const query = Number(searchParams.get('query')) || '';
  const totalCount = use(totalItems);

  return (
    <div className="flex gap-2 items-center">
      <svg className="size-4" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M20.235,18.98l3.763,1.255V2.675c0-1.38-1.13-2.509-2.508-2.509H7.681c-1.38,0-2.497,1.129-2.497,2.509h12.542 c1.38,0,2.51,1.128,2.51,2.509V18.98z M16.473,3.929H2.675c-1.38,0-2.509,1.129-2.509,2.508v17.561l10.034-3.763l8.78,3.763V6.438 C18.98,5.058,17.852,3.929,16.473,3.929z"/></svg>
      <span>{!query ? 'Total' : 'Result'}: {new Intl.NumberFormat().format(totalCount)}</span>
    </div>
  );
}
