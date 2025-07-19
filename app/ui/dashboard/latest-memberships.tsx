// app/ui/dashboard/latest-memberships.tsx
import clsx from 'clsx';
import { Lusitana } from 'next/font/google';
import { fetchLatestMemberships } from '@/app/lib/data';

export default async function LatestMemberships() {
  const latestMemberships = await fetchLatestMemberships();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Latest Memberships
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-blue-400 px-6">
          {latestMemberships.map((membership, i) => (
            <div
              key={membership.id}
              className={clsx(
                'flex flex-col gap-2 py-4',
                { 'border-t': i !== 0 }
              )}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {membership.name}
                  </p>
                  <p className="hidden text-sm text-white sm:block">
                    {membership.email}
                  </p>
                </div>
                <p className={`text-sm font-medium md:text-base`}>
                  ${membership.price}
                </p>
              </div>
              <div className="flex justify-between text-xs text-black">
                <span>Plan: {membership.plan_name}</span>
                <span>Status: {membership.status}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Start: {membership.start_date}</span>
                <span>End: {membership.end_date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}