'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button';


export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending}>
                Test
        </button>
    )
}