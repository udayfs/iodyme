import { TriangleAlert } from "lucide-react";

function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 rounded-lg flex items-center gap-x-2 text-sm p-2 text-destructive border-2 border-destructive mt-4 mb-0">
      <TriangleAlert className="h-4 w-4" />
      <span className="pt-1">{message}</span>
    </div>
  );
}

export default FormError;
