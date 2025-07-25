import Link from "next/link";
import { Briefcase } from "lucide-react";

function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <Briefcase className="h-7 w-7 mr-2" />
              <span className="text-xl text-sky-500 font-bold pt-1">iodyme</span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              A platform connecting top talent with innovative companies. Find
              your next opportunity or hire exceptional professionals.
            </p>
            <div className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Iodyme. All rights reserved.
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-blue-400 transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="hover:text-blue-400 transition-colors"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="hover:text-blue-400 transition-colors"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="hover:text-blue-400 transition-colors"
                >
                  Salary Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">For Employers</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link
                  href="/jobpost"
                  className="hover:text-blue-400 transition-colors"
                >
                  Post Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Find Talent
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
