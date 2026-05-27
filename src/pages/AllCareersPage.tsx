import { useState } from "react";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCareersQuery } from "../services/careersApi";
import { stripToPlainText } from "../utils/formatText";
import type { Career } from "../types/content";
import Header from "../components/Header";
import Seo from "../components/Seo";
import Footer from "../components/Footer";

export default function AllCareersPage() {
  const { data: careers = [], isLoading } = useGetCareersQuery();
  const [tiltedIcon, setTiltedIcon] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setTiltedIcon(id);
    setTimeout(() => setTiltedIcon(null), 400);
  };

  return (
    <>
      <Seo
        title="Careers"
        description="Explore open roles at Syntheseed and join our team building modern products."
        canonical="https://syntheseed.com/careers/all"
        openGraph={{ title: 'Syntheseed Careers', description: 'Explore open roles at Syntheseed and join our team building modern products.', image: '/assets/og-image.png', url: 'https://syntheseed.com/careers/all' }}
      />
      <Header />
      <section className="min-h-screen bg-bg-primary py-16 pt-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-12">
            All Available Careers
          </h2>

          {isLoading ? (
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-effect rounded-2xl p-6 min-h-[260px]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="h-6 w-40 bg-gray-200/60 dark:bg-white/5 rounded animate-pulse mb-3"></div>
                      <div className="h-4 w-28 bg-gray-200/60 dark:bg-white/5 rounded animate-pulse"></div>
                    </div>
                    <div className="h-11 w-11 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg shadow animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {careers.map((career: Career) => (
                <article
                  key={career.id}
                  onClick={() => handleCardClick(career.id)}
                  className="relative glass-effect rounded-2xl p-6 flex flex-col justify-between min-h-[260px] transition-all duration-300 cursor-pointer hover:shadow-2xl"
                  style={{ border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">
                          {career.title}
                        </h3>
                        <span className="
  inline-block text-sm font-semibold px-4 py-1 rounded-full mb-3
  bg-cyan-100 text-cyan-900 border border-cyan-200 shadow
  dark:bg-cyan-900 dark:text-cyan-100 dark:border-cyan-600
">
  {career.department}
</span>

                      </div>

                      <div
                        className={`ml-3 p-3 rounded-lg transform transition-transform duration-300 bg-gradient-to-br from-cyan-400 to-teal-500 text-white ${
                          tiltedIcon === career.id ? "rotate-12 scale-110" : ""
                        }`}
                        style={{
                          minWidth: 48,
                          minHeight: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 8px 30px rgba(6,182,212,0.25)",
                        }}
                      >
                        <Briefcase size={22} strokeWidth={1.6} />
                      </div>
                    </div>

                    <p className="text-secondary text-sm mb-6 line-clamp-3">
                      {stripToPlainText(career.description) ||
                        "No description available."}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-secondary mb-4">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{career.location}</span>
                      </span>

                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{career.job_type}</span>
                      </span>
                    </div>

                    <Link
                      to={`/careers/${career.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-teal-300 font-semibold hover:text-teal-200"
                    >
                      View Role →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
