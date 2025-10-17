type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
};

export async function getLatestVideos(maxResults: number = 6): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID || "UCzK6F9p8QeSxZ8bX5kOeW7Q"; // placeholder, troque no .env
  if (!apiKey) {
    console.warn("[YouTube] YOUTUBE_API_KEY não configurada. Retornando vazio.");
    return [];
  }
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("order", "date");
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("type", "video");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.error("[YouTube] Erro ao buscar vídeos", await res.text());
    return [];
  }
  const data = await res.json();
  return (data.items || []).map((it: any) => ({
    id: it.id.videoId,
    title: it.snippet.title,
    thumbnail: it.snippet.thumbnails.medium.url,
    publishedAt: it.snippet.publishedAt,
  }));
}
