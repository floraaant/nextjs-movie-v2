"use client"

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from "react";
import { Button } from '../ui/button';



export default function SortBy() {
    const [selectedValue, setSelectedValue] = useState('');

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentSort = Number(searchParams.get('sort_by')) || '';

    const createSortURL = (sort: any) => {
        const params = new URLSearchParams(searchParams);
        params?.set('sort_by', sort.toString());
        console.log(params.toString())
        return `${pathname}?${params.toString()}`
    }

    const handleSelectChange = (event: any) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
        console.log(selectedOption)
    };

    return (
        <>
            <select value={selectedValue} defaultValue={currentSort} onChange={handleSelectChange} className='appearance-none mr-4'>
                <option value="">Choisir un tri</option>
                <option value="popularity.asc" className='font-bold'>Moins populaire</option>
                <option value="popularity.desc">Plus populaire</option>
                <option value="revenue.asc">Moins de revenus</option>
                <option value="revenue.desc">Plus de revenus</option>
                <option value="primary_release_date.asc">Plus vieux</option>
                <option value="title.asc">De A à Z</option>
                <option value="title.desc">De Z à A</option>
                <option value="vote_average.asc">Moins bonne note</option>
                <option value="vote_average.desc">Plus bonne note</option>
            </select>
            <Link href={createSortURL(selectedValue)}>
                <Button>
                    Trier
                </Button>
            </Link>
        </>
    )
}