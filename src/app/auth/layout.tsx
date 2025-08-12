import { BackgroundBeams } from "@/components/ui/bg-beams";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative overflow-hidden items-center justify-center min-h-screen flex flex-col w-full antialiased">
      <div className="mx-auto relative z-10">{children}</div>
      <BackgroundBeams className="h-full bg-black/[0.96]" />
    </div>
  );
}

export default AuthLayout;
