import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

// 파일 또는 폴더명을 [] 대괄호 안에 넣어주면 동적 URL을 사용할 수 있음
export default function MovieDetail({ params: { id } }: { params: { id: string } }) {
  
  return (
    <>
      {/* 
        Streaming: 경로를 더 작은 "청크"로 나누고, 준비가 되면 서버에서 클라이언트로 점진적으로 스트리밍할 수 있는 데이터 전송 기술

        - loading.js: Next.js의 App Router에서 특정 경로의 로딩 상태를 관리할 때 사용. 컴포넌트가 로드되는 동안 로딩 상태를 표시
        - Suspense: React의 Suspense는 비동기 작업이 완료될 때까지 대기하는 동안 로딩 상태를 보여줄 때 사용

        비동기 작업이 발생할 때마다 전체 페이지를 새로고침하는 것이 아닌, 해당 부분의 HTML만을 전송하므로, 클라이언트 측에서는 필요한 부분만 업데이트하여 전체 페이지를 다시 렌더링할 필요가 없습니다.
      */}
      <Suspense fallback={<p>Loading movie info...</p>}>
        <MovieInfo id={id} />
      </Suspense>

      <Suspense fallback={<p>Loading movie videos...</p>}>
        <MovieVideos id={id} />
      </Suspense>
    </>
  )
}