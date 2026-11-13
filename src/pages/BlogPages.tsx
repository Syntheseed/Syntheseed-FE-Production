import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { BlogPost, blogDate, blogExcerpt, blogHtml, fetchBlog, fetchBlogs } from "@/lib/blogs";

const BlogCard = ({ post }: { post: BlogPost }) => (
  <Link to={`/blogs/${post.slug}`} className="group block overflow-hidden rounded-2xl border border-border bg-card">
    {post.image ? (
      <img src={post.image} alt="" className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    ) : null}
    <div className="p-6">
      <p className="text-xs uppercase tracking-wider text-primary">
        {[post.category, blogDate(post.created_at)].filter(Boolean).join(" · ")}
      </p>
      <h3 className="mt-3 text-xl font-bold">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-muted-foreground">{blogExcerpt(post.summary)}</p>
    </div>
  </Link>
);

export const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let active = true;
    fetchBlogs().then((items) => { if (active) setPosts(items); }).catch(() => { if (active) setPosts([]); });
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title="Insights" description="Articles from Syntheseed on AI, strategy, and decisions." />
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Insights</p>
        <h1 className="mt-3 mb-10 text-3xl font-bold md:text-5xl">Thinking from Syntheseed.</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const BlogArticlePage = () => {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let active = true;
    setMissing(false);
    fetchBlog(slug)
      .then((item) => { if (active) setPost(item); })
      .catch(() => { if (active) setMissing(true); });
    return () => { active = false; };
  }, [slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title={post?.title || "Insight"} description={blogExcerpt(post?.summary).slice(0, 160)} />
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Link to="/blogs" className="text-sm font-semibold text-primary">All insights</Link>
        {missing ? <h1 className="mt-6 text-3xl font-bold">This article is not available.</h1> : null}
        {post ? (
          <article className="mt-6">
            {post.image ? <img src={post.image} alt="" className="mb-8 w-full rounded-2xl border border-border object-cover" /> : null}
            <p className="text-xs uppercase tracking-wider text-primary">
              {[post.category, blogDate(post.created_at)].filter(Boolean).join(" · ")}
            </p>
            <h1 className="mt-3 text-3xl font-bold md:text-5xl">{post.title}</h1>
            <div
              className="mt-8 space-y-4 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_strong]:text-foreground [&_a]:text-primary"
              dangerouslySetInnerHTML={{ __html: blogHtml(post.content || post.summary) }}
            />
          </article>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};
