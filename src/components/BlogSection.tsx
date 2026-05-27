import { useNavigate } from "react-router-dom";
import { useGetBlogsQuery } from "../services/blogApi";
import { trackEvent } from '../utils/analytics';
import { stripToPlainText } from "../utils/formatText";
import { getBlogImage } from "../utils/blogImages";
import type { Blog } from "../types/content";

const BlogSection = () => {
  const { data: blogs = [], isLoading } = useGetBlogsQuery(undefined);
  const navigate = useNavigate();

  // Limit to latest 6 blogs
  const recentBlogs = blogs.slice(0, 6);

  const handleReadMore = (slug: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/blogs/${slug}`);
  };

  const handleViewAll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/blogs");
  };

  return (
    <section id="blogs" className="py-20 bg-[rgb(var(--bg-primary))]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-[rgb(var(--synth-blue))] font-semibold uppercase tracking-widest mb-2">
          BLOG
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[rgb(var(--text-primary))] mb-3">
          Latest from Syntheseed
        </h2>
        <p className="text-[rgb(var(--text-secondary))] text-lg mb-12">
          Ideas on product strategy, go-to-market, and founder operations.
        </p>

        {isLoading ? (
          // Loading skeletons (match AllBlogsPage)
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
            {recentBlogs.map((blog: Blog) => (
              <div
                key={blog.id}
                className="bg-[rgb(var(--bg-secondary))] rounded-2xl shadow-md hover:shadow-2xl border border-[rgb(var(--border-subtle))] transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden"
              >
                {getBlogImage(blog.slug, blog.image) && (
                  <img
                    src={getBlogImage(blog.slug, blog.image)}
                    alt={blog.title}
                    className="w-full h-52 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[rgba(var(--synth-blue),0.1)] text-[rgb(var(--synth-blue))] text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category || "AI & Innovation"}
                    </span>
                    <span className="text-[rgb(var(--text-secondary))] text-sm">
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-[rgb(var(--text-secondary))] text-sm mb-4 flex-grow line-clamp-3">
                    {stripToPlainText(blog.summary) || "Discover more in this article."}
                  </p>

                  <button
                    onClick={() => { trackEvent('button_click', { button: 'Read More', location: 'blog_section', blog_slug: blog.slug }); handleReadMore(blog.slug); }}
                    className="text-[rgb(var(--synth-blue))] font-medium hover:text-[rgb(var(--synth-blue-inactive))] mt-auto flex items-center gap-1"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <button onClick={() => { trackEvent('button_click', { button: 'View All Articles', location: 'blog_section' }); handleViewAll(); }} className="btn-primary mx-auto">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
