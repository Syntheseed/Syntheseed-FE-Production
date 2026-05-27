import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { useGetCareersQuery } from "../services/careersApi";
import { trackEvent } from '../utils/analytics';
import { stripToPlainText } from "../utils/formatText";
import type { Career } from "../types/content";

export default function CareersSection() {
  const { data: careersData = [], isLoading } = useGetCareersQuery();
  const careers = (careersData as Career[]).slice(0, 6);

  return (
    <section id="careers" className="py-20 bg-[rgb(var(--bg-primary))]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-[rgb(var(--synth-blue))] font-semibold uppercase tracking-widest mb-2">
          CAREERS
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[rgb(var(--text-primary))] mb-3">
          Join Our Team
        </h2>
        <p className="text-[rgb(var(--text-secondary))] text-lg mb-12">
          Build the future of innovation with us — explore our open roles.
        </p>

        {isLoading ? (
          // Loading skeletons
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-effect rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200/60 dark:bg-white/5 rounded w-3/4 mb-3 animate-pulse"></div>
                      <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-1/2 mb-4 animate-pulse"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-200/60 dark:bg-white/5 rounded-xl animate-pulse" />
                  </div>
                  <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-5/6 mb-4 animate-pulse"></div>
                  <div className="flex gap-4 mb-4">
                    <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-20 animate-pulse"></div>
                    <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career: Career) => (
              <div
                key={career.id}
                className="bg-[rgb(var(--bg-secondary))] rounded-2xl shadow-md hover:shadow-2xl border border-[rgb(var(--border-subtle))] transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden"
              >
                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[rgb(var(--text-primary))] mb-3 leading-snug">
                        {career.title}
                      </h3>
                      <span className="inline-block bg-[rgba(var(--synth-blue),0.1)] text-[rgb(var(--synth-blue))] text-xs font-semibold px-3 py-1 rounded-full">
                        {career.department}
                      </span>
                    </div>
                    <div className="bg-gradient-to-tr from-[rgb(var(--synth-blue))] to-[rgb(var(--synth-blue-inactive))] p-3 rounded-xl text-white shadow-lg">
                      <Briefcase size={20} />
                    </div>
                  </div>

                  <p className="text-[rgb(var(--text-secondary))] text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
                    {stripToPlainText(career.description) || "No description available."}
                  </p>

                  <div className="text-[rgb(var(--text-secondary))] text-sm flex items-center flex-wrap gap-4 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-[rgb(var(--synth-blue))]" />
                      {career.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-[rgb(var(--synth-blue))]" />
                      {career.job_type}
                    </span>
                  </div>

                  <Link
                    to={`/careers/${career.id}`}
                    onClick={() => {
                      trackEvent('button_click', { button: 'View Role', location: 'careers_section', career_id: career.id });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-[rgb(var(--synth-blue))] font-medium hover:text-[rgb(var(--synth-blue-inactive))] mt-auto flex items-center gap-1"
                  >
                    View Role →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link
            to="/careers/all"
            onClick={() => { trackEvent('button_click', { button: 'View All Careers', location: 'careers_section' }); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="btn-primary mx-auto"
          >
            View All Careers
          </Link>
        </div>
      </div>
    </section>
  );
}