import Link from "next/link";

export function PostListItem({ slug, title, date, excerpt, readingTime }: { slug: string; title: string; date: string; excerpt: string; readingTime: number; }) {
  return (
    <article className="card">
      <h3 className="text-lg font-semibold mb-1">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>
      <p className="muted mb-2">{date} • {readingTime} min</p>
      <p>{excerpt}</p>
    </article>
  );
}
