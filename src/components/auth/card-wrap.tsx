import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

type WrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
};

function Wrapper({ children, headerLabel }: WrapperProps) {
  return (
    <Card className="w-[350px] text-gray-900 rounded-lg dark:text-white dark:bg-white/1 dark:backdrop-blur-xs border-2">
      <CardHeader>
        <div className="flex flex-col w-full items-center justify-center pb-2">
          <div className="flex flex-col items-center pb-2">
            <Briefcase className="h-7 w-7" />
            <span className="text-lg font-bold text-sky-500">iodyme</span>
          </div>
          <p className="font-medium text-sm">{headerLabel}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default Wrapper;
