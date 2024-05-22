import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Home',
}

// 컴포넌트가 꼭 default로 export 되어야 함
// Next.js가 자동으로 라우팅을 처리하고 각 페이지에 맞는 컴포넌트를 렌더링 하기 위해.
export default function Page(){
  return (
    <>
      <h1>Hello!</h1>
    </>
  )
}