import { useGetBlogsQuery } from "../services/blogApi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Seo from "../components/Seo";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { stripToPlainText } from "../utils/formatText";
import type { Blog } from "../types/content";

const AllBlogs = () => {
  const { data: blogs = [], isLoading } = useGetBlogsQuery(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top on load
  }, []);

  const handleReadMore = (slug: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/blogs/${slug}`);
  };

  return (
    <>
      <Seo
        title="Blog"
        description="Insights on AI, product strategy and technology innovation from the Syntheseed team."
        canonical="https://syntheseed.com/blogs"
        openGraph={{ title: 'Syntheseed Blog', description: 'Insights on AI, product strategy and technology innovation from the Syntheseed team.', image: '/assets/og-image.png', url: 'https://syntheseed.com/blogs' }}
      />
      <Header />
      <section className="min-h-screen bg-bg-primary py-16 pt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-teal-500 font-semibold uppercase tracking-widest mb-2">
            All Articles
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-3">
            Explore Our Blog Library
          </h2>
          <p className="text-secondary text-lg mb-12">
            Insights on AI, product strategy, and technology innovation.
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-effect rounded-2xl overflow-hidden">
                  <div className="w-full h-52 bg-gray-200/60 dark:bg-white/5 animate-pulse" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-3/4 mb-3 animate-pulse"></div>
                    <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: Blog) => (
                <div
                  key={blog.id}
                  className="bg-bg-secondary rounded-2xl shadow-md hover:shadow-2xl border border-teal-100 transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden"
                >
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-52 object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-grow text-left">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-teal-100 text-teal-600 text-xs font-semibold px-3 py-1 rounded-full">
                        {blog.category || "Innovation"}
                      </span>
                      <span className="text-secondary text-sm">
                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-secondary text-sm mb-4 flex-grow line-clamp-3">
                      {stripToPlainText(blog.excerpt ?? blog.summary) || "Read this detailed article for insights."}
                    </p>

                    <button
                      onClick={() => handleReadMore(blog.slug)}
                      className="text-teal-600 font-medium hover:text-teal-700 mt-auto flex items-center gap-1"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllBlogs;
