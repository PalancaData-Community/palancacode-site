import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  contentHtml: string;
  readingTime: number;
};

function calcReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getAllSlugs(): Promise<string[]> {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".md"));
  return files.map(f => f.replace(/\.md$/, ""));
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".md"));
  const items: Post[] = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processed = await remark().use(html).process(content);
    const contentHtml = processed.toString();
    items.push({
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? content.slice(0, 160) + "...",
      contentHtml,
      readingTime: calcReadingTime(content),
    });
  }
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getRecentPosts(n: number): Promise<Post[]> {
  const all = await getAllPosts();
  return all.slice(0, n);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, slug + ".md");
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? content.slice(0, 160) + "...",
    contentHtml,
    readingTime: calcReadingTime(content),
  };
}
