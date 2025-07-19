import LatestMemberships from "@/app/ui/dashboard/latest-memberships";
import { Footer } from "@/app/ui/footer";
import { Header } from "@/app/ui/header";
import { fetchLatestMemberships } from "@/app/lib/data";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div>
      <Header />
      <div>
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <LatestMemberships />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}