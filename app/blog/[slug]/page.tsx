import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post?.title ?? "Post",
    description: post?.excerpt ?? undefined
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return <div>Post não encontrado.</div>;

  return (
    <main className="prose-dark">
      <h1>{post.title}</h1>
      <p className="muted">{post.date} • {post.readingTime} min</p>
      <article dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  );
}
