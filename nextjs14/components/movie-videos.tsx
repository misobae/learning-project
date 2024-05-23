import { API_URL } from "../app/(home)/page";

async function getVideos(id:string) {
  console.log(`Fetching videos: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // throw new Error('something broke...');
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({id}: {id:string}) {
  const videos = await getVideos(id);
  return (
    <div>
      <h2>Movie Videos</h2>
      {videos.slice(0, 6).map((video) => (
        <div key={video.id}>
          <h3>{video.name}</h3>
          {video.site === "YouTube" && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      ))}
    </div>
  );
}