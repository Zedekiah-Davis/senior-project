import { Header } from "@/app/ui/header";
import { Footer } from "@/app/ui/footer";
import { Suspense } from "react";
import LatestMemberships from "@/app/ui/dashboard/latest-memberships";
import { fetchMembershipsPages } from "@/app/lib/data";

export default async function Page(props: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchMembershipsPages(query);

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