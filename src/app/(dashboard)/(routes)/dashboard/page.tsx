'use client'


import { ArrowRightIcon, FaceIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
const tools = [
  {
    label: "conversation",
    icon: FaceIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/coonversation",
  },
  {
    label: "conversation",
    icon: FaceIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/coonversation",
  },
  {
    label: "conversation",
    icon: FaceIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/coonversation",
  },
  {
    label: "conversation",
    icon: FaceIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/coonversation",
  },
];

const DashboardPage = () => {

  const router = useRouter()
  return (
    <main>
      <div>
        <div className="mb-8 space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Explore the Power of AI
          </h1>

          <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
            Welcome to the AI dashboard! Here, you can explore the capabilities
            of AI and discover how it
          </p>
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool) => (
            <Card
            onClick={()=>router.push(tool.href)}
              key={tool.href}
              className="p-4 
              border-black/5 flex items-center
               justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>

                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
<ArrowRightIcon className="w-5 h-5"/>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
