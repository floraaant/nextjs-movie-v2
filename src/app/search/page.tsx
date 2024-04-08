import SearchBar from "@/components/ui/searchbar";

export default async function Page({ params }: { params: { id: number } }) {

      return (
        <main>
          <section className="w-full py-12 md:py-8 lg:py-16 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
                <SearchBar />

            </div>
        </section>
      </main>
      );
}