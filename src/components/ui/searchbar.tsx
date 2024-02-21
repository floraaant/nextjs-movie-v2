'use client';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    const handleSearch = useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      
      if(term){
        params.set('query', term)
      } else {
        params.delete('query')
      }
      replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Input className="max-w-lg flex-1" placeholder="Search for a movie or TV show..." type="text" onChange={(e) => { handleSearch(e.target.value.trim()) }} defaultValue={searchParams.get('query')?.toString()} />
            <Button className="w-full md:w-auto" type="submit">
                Discover
            </Button>
        </div>
    )
}