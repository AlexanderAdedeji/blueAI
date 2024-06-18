import { Button } from "@/components/ui/button";
import { defaultConfig } from "next/dist/server/config-shared";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return <main>
    
    
    
    
    Landing Page 

    <Link href={"/sign-in"}>
    <Button>
      Login
    </Button>
    </Link>
    <Link href={"/sign-up"}>
    <Button>
      Register
    </Button>
    </Link>
    </main>;
};

export default LandingPage;
