"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  
  return (
    <nav>
      <ul>
        <li>
          {/* Link 컴포넌트는 Client Side Only Navigation을 수행하기 때문에 새로고침이 되지 않음.

          hydration 프로세스: 
          1. 유저가 /about-us 페이지에 접속하려고 한다
          2. next.js는 그 요청을 보고 components를 dummy HTML로 변환한다
          3. 그것이 사용자에게 전달되고,
             (여기까지는 단순 html anchor임)
          4. 그 즉시. 아주 빠르게 프레임워크는 load를 시작한다
          5. dummy HTML에 새로운 React app을 초기화한다 
             (여기서부터 anchor가 아닌 React component가 됨)

          요약: hydration은 단순 HTML을 React 앱으로 초기화 하는 작업
          */}
          <Link href="/">Home</Link> {path === "/" ? "🔥" : ""}
        </li>
        <li>
          <Link href="/about-us">About Us</Link> {path === "/about-us" ? "🔥" : ""}
        </li>
      </ul>
    </nav>
  )
}