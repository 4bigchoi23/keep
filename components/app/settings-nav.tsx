'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  LucideLayoutDashboard,
  LucideArrowRight,
} from "lucide-react";
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';

type Setting = {
  label: string;
  icon: IconName;
  to: string;
}

export const settings: Setting[] = [
  {
    label: 'Profile',
    icon: 'user-pen',
    to: '/settings/profile',
  },
  {
    label: 'Account',
    icon: 'wallet-minimal',
    to: '/settings/account',
  },
  {
    label: 'Security',
    icon: 'shield-user',
    to: '/settings/security',
  },
  {
    label: 'Import my bookmark',
    icon: 'corner-right-down',
    to: '/settings/import',
  },
  {
    label: 'Export my bookmark',
    icon: 'corner-up-right',
    to: '/settings/export',
  },
];

export default function SettingsNav({
  session,
}: {
  session?: Session | null;
}) {
  const pathname = usePathname();
  return (
    <>
      <Card>
        <CardHeader>
          <div className="w-full flex items-center justify-start gap-3 truncate">
            <div className="flex-0">
              <div className="avatar" style={{ backgroundImage: `url(${session?.user?.photo ?? '/pfimg.svg'})` }}></div>
            </div>
            <div className="flex flex-col truncate">
              <div className="text-base/4 font-medium text-muted-foreground truncate">
                {session?.user?.nick ?? session?.user?.name ?? `You`}
              </div>
              <div className="text-xs/4 text-muted-foreground/50 truncate">
                Personal settings
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            {settings.map((setting, key) => (
              <Button
                key={key}
                asChild
                variant="ghost"
                size="sm"
              >
                <Link
                  href={setting?.to ?? ''}
                  className={`justify-start ${setting.to === pathname ? 'bg-muted' : 'bg-none'}`}
                >
                  <DynamicIcon name={setting?.icon ?? ''} size={16} className="opacity-25" />
                  <span>{setting?.label ?? ''}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="hidden sm:block">
          <Button className="w-full pointer-events-none">
            <LucideLayoutDashboard /> Support <LucideArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
