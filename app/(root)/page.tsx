import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

export default async function Home({ searchParams}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || ''
  const category = (searchParams?.category as string) || ''
  const products = await getAllProducts({
    query: searchText,
    category,
    page,
    limit: 6
  })

    console.log(products)


  return (
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
      </div>

      <Collection 
        data={products?.data}
        emptyTitle="No Products Found"
        emptyStateSubtext="Search for something else"
        collectionType="All_Products"
        limit={6}
        page={1}
        totalPages={2}
      />
    </section>
  );
}
