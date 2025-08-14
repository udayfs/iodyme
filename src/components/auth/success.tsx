import { CheckCircle2 } from "lucide-react";

function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 rounded-lg flex items-center gap-x-2 text-sm p-2 text-emerald-200 border-2 border-emerald-600 mt-4 mb-0">
      <CheckCircle2 className="h-4 w-4" />
      <span className="pt-1">{message}</span>
    </div>
  );
}

export default FormSuccess;
