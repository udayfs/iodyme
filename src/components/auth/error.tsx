import { LucideMessageSquareWarning } from "lucide-react";

function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <div className="bg-destructive/15 rounded-lg flex items-center gap-x-2 text-sm text-destructive">
      <LucideMessageSquareWarning className="h-4 w-4" />
      <span>{error}</span>
    </div>
  );
}

export default FormError;
