'use client';

// import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  LucideSearch,
  LucideX,
} from 'lucide-react';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function KeepSearch({ 
  placeholder,
}: { 
  placeholder?: string;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [search, setSearch] = useState('');

  useEffect(() => {
  }, []);

  const handleSearch = useDebouncedCallback((term) => {
    params.delete('page');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  const handleRemove = () => {
    setSearch('');
    handleSearch('');
  };

  return (
    <div className="relative">
      <Input className="w-full px-8" placeholder={placeholder} value={search} onChange={handleChange} />
      <Button variant="link" size="icon" className="absolute left-0 top-0 bottom-0 pointer-events-none"><LucideSearch /></Button>
      {search && <Button variant="link" size="icon" className="absolute right-0 top-0 bottom-0 hover:bg-transparent" onClick={handleRemove}><LucideX /></Button>}
    </div>
  );
}
