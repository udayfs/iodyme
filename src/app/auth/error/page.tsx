import ErrorCard from "@/components/auth/error-card";
import { Suspense } from "react";

function ErrorPage() {
  return (
    <Suspense>
      <ErrorCard />;
    </Suspense>
  );
}

export default ErrorPage;
