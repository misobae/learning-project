import Link from "next/link";
import styles from "../../../styles/about-us.module.css";

export default function CompanyPage(){
  return (
    <>
    <h1 className={styles.title}>Our Story</h1>
    <p className={styles.text}>CineInsight was born in 2023 out of a shared love for movies and a desire to create a one-stop destination for all things cinema. What started as a small project has grown into a vibrant community of film enthusiasts.</p>

    <h1 className={styles.title}>Why Choose Us?</h1>
    <ul className={styles.list}>
      <li>Curated content: Our team of movie buffs ensures that you get the most relevant and exciting information.</li>
      <li>User-friendly interface: Navigate through our vast database with ease.</li>
      <li>Regular updates: Stay in the loop with daily updates on new releases and trending films.</li>
    </ul>

    <h1 className={styles.title}>Join Our Community</h1>
    <p className={styles.text}>Whether you're a casual moviegoer or a dedicated cinephile, CineInsight is your perfect companion in the world of film. Explore, engage, and enhance your movie-watching experience with us!</p>

    <h1 className={styles.title}>Get in Touch</h1>
    <p>📧 Email: info@cineinsight.com</p>

    <Link className={styles.link} href={`/about-us`}>← Back to About us</Link>
  </>
  )
}