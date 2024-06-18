import { UserButton } from "@clerk/nextjs";
import { defaultConfig } from "next/dist/server/config-shared";
import Image from "next/image";

const DashboardPage =() => {
  return <main>Hello WOlrd


    <UserButton afterSignOutUrl="/"/>
  </main>;
}


export default DashboardPage