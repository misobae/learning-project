import Link from "next/link";
import styles from "../../styles/about-us.module.css";

export default function AboutUs(){
  return (
    <>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.text}>Welcome to CineInsight - Your Gateway to the World of Cinema!</p>

      <h1 className={styles.title}>Our Mission</h1>
      <p className={styles.text}>At CineInsight, we're passionate about connecting movie enthusiasts with the latest and greatest in film. Our mission is to provide a comprehensive, user-friendly platform where cinema lovers can explore, discover, and get excited about movies.</p>

      <h1 className={styles.title}>What We Offer</h1>
      <ul className={styles.list}>
        <li>Up-to-date information on the latest releases and classics</li>
        <li>High-quality trailers to give you a taste of what's to come</li>
        <li>Detailed cast and crew information</li>
        <li>User ratings and reviews to help you make informed choices</li>
      </ul>

      <Link className={styles.link} href={`/about-us/company`}>More about us →</Link>
    </>
  )
}