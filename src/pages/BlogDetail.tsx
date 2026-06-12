import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useGetBlogDetailQuery } from "../services/blogApi";
import { trackEvent } from '../utils/analytics';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { stripToPlainText, toSafeRichText } from "../utils/formatText";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading, isError } = useGetBlogDetailQuery(slug ?? "", { skip: !slug });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <>
        <Header />
        <section className="max-w-5xl mx-auto px-6 py-20 pt-24">
          {/* Image skeleton */}
          <div className="mb-8">
            <div className="w-full rounded-2xl bg-bg-secondary h-56 animate-pulse dark:bg-white/5" />
          </div>
          {/* Title skeleton */}
          <div className="h-10 bg-gray-200/60 dark:bg-white/5 rounded w-3/4 animate-pulse mb-4" />
          {/* Date skeleton */}
          <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-1/4 animate-pulse mb-6" />
          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-4/6 animate-pulse"></div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (isError || !blog) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24">
          <h2 className="text-3xl font-semibold mb-4 text-primary">Blog Not Found</h2>
          <p className="mb-6 text-secondary">We couldn’t find this article. Please try again later.</p>
          <Link to="/blogs" className="btn-primary">Back to Blogs</Link>
        </div>
        <Footer />
      </>
    );
  }

  const anyBlog: any = blog as any;
  const seoDescription = anyBlog ? stripToPlainText(anyBlog.excerpt ?? anyBlog.summary ?? anyBlog.content).slice(0, 160) : '';

  return (
    <>
      {anyBlog && (
        <Seo
          title={anyBlog.title}
          description={seoDescription}
          canonical={`https://your-domain.com/blogs/${anyBlog.slug}`}
          openGraph={{
            title: anyBlog.title,
            description: seoDescription,
            image: anyBlog.image || '/assets/og-image.png',
            url: `https://your-domain.com/blogs/${anyBlog.slug}`,
          }}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: anyBlog.title,
            image: [anyBlog.image || 'https://your-domain.com/assets/og-image.png'],
            datePublished: anyBlog.created_at,
            author: { '@type': 'Organization', name: 'Syntheseed' },
          }}
        />
      )}

      <Header />
      <section className="max-w-5xl mx-auto px-6 py-20 pt-24">
        {anyBlog.image && (
          <div className="mb-8">
            <img
              src={anyBlog.image}
              alt={anyBlog.title}
              className="w-full rounded-2xl shadow-md object-cover max-h-[400px]"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-5 text-primary">{anyBlog.title}</h1>
        <p className="text-secondary mb-4">{new Date(anyBlog.created_at).toLocaleDateString()}</p>

        {anyBlog.content ? (
          <div
            className="prose prose-neutral prose-sm max-w-none leading-relaxed text-primary"
            dangerouslySetInnerHTML={{ __html: toSafeRichText(anyBlog.content) }}
          />
        ) : (
          <p className="text-secondary">No content available.</p>
        )}

        <div className="mt-8">
          <Link
            to="/blogs"
            onClick={() => { trackEvent('button_click', { button: 'Back to All Blogs', location: 'blog_detail' }); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="btn-primary"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetail;
