import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1.5">
          <div>© 2024 RippleChat. All rights reserved.</div>
          <div className="space-x-4 mt-2 flex flex-col">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="@email to Subscribe"
            className="bg-gray-800 border-none"
          />
          <Button className="border-2 hover:bg-gray-950 cursor-pointer">Subscribe</Button>
        </div>
      </div>
    </footer>
  );
}