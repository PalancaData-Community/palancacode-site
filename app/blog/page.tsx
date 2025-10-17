import { getAllPosts } from "@/lib/posts";
import BlogListClient from "@/components/BlogListClient";

export const dynamic = "force-static";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <main>
      <h1 className="text-2xl md:text-3xl font-semibold mb-3">Blog</h1>
      <BlogListClient posts={posts} />
    </main>
  );
}
