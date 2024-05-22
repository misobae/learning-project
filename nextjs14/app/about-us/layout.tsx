import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'About Us',
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      &copy; NEXT JS IS GREAT!
    </div>
  )
}