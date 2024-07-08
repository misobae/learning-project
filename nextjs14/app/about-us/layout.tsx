import { Metadata } from "next";
import styles from "../../styles/about-us.module.css";

export const metadata: Metadata = {
  title: 'About Us',
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className={styles.layout}>
      {children}
    </div>

    <footer className={styles.footer}>
      &copy; NEXT JS IS GREAT!
    </footer>
    </>
  )
}