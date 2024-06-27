'use client'

import { useToast } from "@/components/ui/use-toast"
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FavoriteToast = () => {
    const { toast } = useToast()

    return (
        <Button
            onClick={() => {
                toast({
                    title: "Ajouté au favoris !",
                    description: "Le film a bien été ajouté aux favoris.",
                })
            }}
        >
            <Heart size={16} className='mr-2' />
            Ajouter au favoris
        </Button>
    )
}
