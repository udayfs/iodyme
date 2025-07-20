import Navbar from "@/components/navbar";
import { Spotlight } from "@/components/ui/spotlight";

function Home() {
  return (
    <div className="min-h-screen dark:bg-black/[0.98] relative overflow-hidden">
      <Navbar />
      <Spotlight />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to <span className="text-primary">iodyme</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your dream job or hire the perfect candidate. Connect talent
            with opportunity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">For Job Seekers</h3>
              <p className="text-sm text-muted-foreground">
                Browse thousands of job opportunities from top companies
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">For Employers</h3>
              <p className="text-sm text-muted-foreground">
                Post jobs and find qualified candidates quickly
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Career Resources</h3>
              <p className="text-sm text-muted-foreground">
                Get salary insights and career advice from experts
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
