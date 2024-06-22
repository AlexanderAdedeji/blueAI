import React from "react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "../mobile-sidebar/mobile-sidebar";

function Navbar() {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />

      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;
