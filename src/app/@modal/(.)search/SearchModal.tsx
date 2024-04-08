"use client"


import { useRouter } from "next/router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import SearchBar from "@/components/ui/searchbar";


export default function SearchModal() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Dialog open={pathname === "/search"} onOpenChange={() => router.back()}>
      <DialogContent>
        <SearchBar />
      </DialogContent>
    </Dialog>
  );
}
