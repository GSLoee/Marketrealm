import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/product.actions";
import Image from "next/image";

export default async function Home() {
  const products = await getAllProducts({
    query: '',
    category: '',
    page: 1,
    limit: 6
  })

    console.log(products)


  return (
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          Categories
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
