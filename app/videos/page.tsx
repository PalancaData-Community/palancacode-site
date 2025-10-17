import { getLatestVideos } from "@/lib/youtube";

export const revalidate = 3600;

export default async function VideosPage() {
  const videos = await getLatestVideos(12);

  return (
    <main>
      <h1 className="text-2xl md:text-3xl font-semibold mb-3">Vídeos</h1>
      <div className="grid-cards gap-5 md:grid-cols-2 lg:grid-cols-3">
        {videos.map(v => (
          <a key={v.id} className="card" href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank">
            <img className="rounded-xl mb-2" src={v.thumbnail} alt={v.title} />
            <h3 className="text-base font-semibold mb-1">{v.title}</h3>
            <p className="muted">{new Date(v.publishedAt).toLocaleDateString("pt-BR")}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
