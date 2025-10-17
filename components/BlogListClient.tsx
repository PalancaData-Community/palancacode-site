'use client';

import { useMemo, useState } from 'react';
import { PostListItem } from '@/components/PostListItem';

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  // contentHtml existe no objeto vindo do servidor, mas não usaremos aqui
};

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((p) =>
      [p.title, p.excerpt].some((t) => t?.toLowerCase().includes(query))
    );
  }, [q, posts]);

  return (
    <>
      <input
        className="search"
        placeholder="Buscar..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PostListItem key={p.slug} {...p} />
        ))}
      </div>
    </>
  );
}
