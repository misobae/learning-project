import { Metadata } from "next"
import Movie from "../../components/movie";
import styles from "../../styles/home.module.css";
import { API_URL } from "../constants";

export const metadata: Metadata = {
  title: 'Home',
}

async function getMovies() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

// 컴포넌트가 꼭 default로 export 되어야 함: Next.js가 자동으로 라우팅을 처리하고 각 페이지에 맞는 컴포넌트를 렌더링 하기 위해.
// Next.js는 기본적으로 페이지를 작은 HTML 청크로 나눠서 준비된 HTML 부분을 브라우저에게 줄 수 있음. data를 fetching할 경우 시간이 소요되기 떄문에 브라우저에게 먼저 layout과 loading 컴포넌트를 주고, fetching이 완료되었을 때 결과값이 있는 컴포넌트를 브라우저에 전달해 loading 컴포넌트로 부터 교체한다. 그래서 이 페이지는 "async/await"여야 한다!
export default async function HomePage(){
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          id={movie.id}
          poster_path={movie.poster_path} />
      ))}
    </div>
  )
}