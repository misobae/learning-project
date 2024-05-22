// 파일 또는 폴더명을 [] 대괄호 안에 넣어주면 동적 URL을 사용할 수 있음
export default function MovieDetail({ params: { id } }: { params: { id: string } }) {
  return <h1>Movie {id}</h1>
}