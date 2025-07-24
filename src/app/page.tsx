import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import {
  Search,
  MapPin,
  TrendingUp,
  Shield,
  ArrowRight,
  Star,
  Building2,
  Bot,
} from "lucide-react";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden min-h-screen dark:bg-black dark:text-white text-gray-950">
        <Spotlight />
        {/* Hero Section */}
        <section>
          <div className="relative container mx-auto px-4 py-20 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                Start Your Career With
                <span className="block p-1 font-bold bg-gradient-to-r from-sky-200 to-sky-400 bg-clip-text text-transparent">
                  Iodyme
                </span>
              </h1>

              <p className="text-md p-2 md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                Connect with top companies and discover opportunities that match
                your skill set. Join thousands of professionals who found their
                perfect role in the industry.
              </p>

              {/* Search Bar */}
              <form className="max-w-3xl mx-auto mb-5">
                <div className="flex flex-col sm:flex-row gap-4 p-2 dark:bg-stone-900/50 bg-slate-200 backdrop-blur-sm rounded-lg border border-slate-700/50">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Job title, keywords, or company"
                      className="pl-10 bg-transparent border-0 rounded-lg focus-visible:ring-2 focus-visible:ring-sky-500"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Location"
                      className="pl-10 bg-transparent border-0 rounded-lg focus-visible:ring-2 focus-visible:ring-sky-500"
                    />
                  </div>
                  <Button
                    className="px-8 py-3 rounded-lg font-semibold hover:cursor-pointer hover:bg-sky-300"
                    variant="outline"
                    type="submit"
                  >
                    Search Jobs
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-8 dark:bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-4xl font-bold mb-3 text-gray-600">
                Featured Opportunities
              </h2>
              <p className="text-lg max-w-2xl mx-auto">
                Discover hand-picked positions from top-tier companies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Senior Frontend Developer",
                  company: "TechCorp",
                  location: "San Francisco, CA",
                  salary: "$120K - $180K",
                  type: "Full-time",
                  tags: ["React", "TypeScript", "Next.js"],
                },
                {
                  title: "Product Manager",
                  company: "InnovateLab",
                  location: "New York, NY",
                  salary: "$140K - $200K",
                  type: "Full-time",
                  tags: ["Strategy", "Analytics", "Leadership"],
                },
                {
                  title: "DevOps Engineer",
                  company: "CloudScale",
                  location: "Remote",
                  salary: "$110K - $160K",
                  type: "Remote",
                  tags: ["AWS", "Kubernetes", "Docker"],
                },
              ].map((job, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-300 border-blue-400/30"
                      >
                        {job.type}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 mb-2">{job.company}</p>
                    <div className="flex items-center text-slate-400 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="text-blue-400 font-semibold mb-4">
                      {job.salary}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="border-slate-600 text-slate-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button
                variant="outline"
                className="text-blue-400 dark:hover:bg-sky-400 hover:bg-sky-400 hover:cursor-pointer pt-3"
              >
                <Link href="/jobs">View All Jobs</Link>
                <ArrowRight className="w-4 h-4 ml-1 pb-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-4xl font-bold mb-3 text-gray-600">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg max-w-2xl mx-auto">
                Advanced tools and features designed to accelerate your career
                growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Verified Recruiters",
                  description:
                    "All employers are thoroughly vetted to ensure legitimate opportunities",
                },
                {
                  icon: <Bot className="w-8 h-8" />,
                  title: "AI Powered Guide",
                  description:
                    "Round-the-clock assistance for all your job search needs",
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Career Growth",
                  description:
                    "Access to mentorship programs and skill development resources",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/30 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-500/30 group-hover:to-cyan-400/30 transition-all duration-300">
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-4xl font-bold mb-3 text-gray-600">
                Success Stories
              </h2>
              <p className="text-lg max-w-2xl mx-auto">
                Hear from professionals who transformed their careers with us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Sarah Chen",
                  role: "Software Engineer at Google",
                  content:
                    "Found my dream job in just 2 weeks! The platform's matching algorithm is incredibly accurate.",
                  rating: 5,
                },
                {
                  name: "Marcus Johnson",
                  role: "Product Manager at Stripe",
                  content:
                    "The quality of opportunities here is unmatched. Highly recommend to any tech professional.",
                  rating: 5,
                },
                {
                  name: "Emily Rodriguez",
                  role: "UX Designer at Figma",
                  content:
                    "Amazing support team and seamless application process. Couldn't be happier with the results!",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700/50"
                >
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-400 relative overflow-visible">
              <span className="relative z-10">
                Ready to Launch Your Career?
              </span>
              <span
                aria-hidden
                className="pointer-events-none hidden dark:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[180%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.35) 0%, rgba(59,130,246,0.18) 60%, rgba(56,189,248,0.10) 100%)",
                  filter: "blur(32px)",
                  zIndex: 1,
                }}
              />
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Join thousands of professionals who have already found their
              perfect role. Your next opportunity is just one click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button className="bg-sky-500 hover:bg-sky-700 px-8 py-4 dark:text-gray-200 text-lg font-semibold rounded-lg hover:cursor-pointer">
                Get Started Free
              </Button>

              <Button
                variant="outline"
                className="border-blue-500 hover:bg-sky-200 px-8 py-4 text-lg rounded-lg bg-transparent hover:cursor-pointer"
              >
                For Employers
              </Button>
            </div>

            <p className="text-sm mt-6">
              No credits required • Free forever • Join 1M+ professionals
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
