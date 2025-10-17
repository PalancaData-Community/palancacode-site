import Link from "next/link";
import { getRecentPosts } from "@/lib/posts";
import { getLatestVideos } from "@/lib/youtube";
import { PostListItem } from "@/components/PostListItem";
import { Card } from "@/components/Card";

export default async function Page() {
  const posts = await getRecentPosts(4);
  const videos = await getLatestVideos(4);

  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold">PalancaCode</h1>
        <p className="muted">GenAI • MLOps • Programação • Tutoriais</p>
      </header>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Últimos Artigos</h3>
          <Link className="btn" href="/blog">Ver todos</Link>
        </div>
        <div className="grid-cards gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostListItem key={p.slug} {...p} />
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Últimos Vídeos</h3>
          <Link className="btn" href="/videos">Ver todos</Link>
        </div>
        <div className="grid-cards gap-5 md:grid-cols-2 lg:grid-cols-3">
          {videos.map(v => (
            <a key={v.id} className="card" href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank">
              <img className="rounded-xl mb-2" src={v.thumbnail} alt={v.title} />
              <h3 className="text-base font-semibold mb-1">{v.title}</h3>
              <p className="muted">{new Date(v.publishedAt).toLocaleDateString("pt-BR")}</p>
            </a>
          ))}
        </div>
      </Card>
    </main>
  );
}
