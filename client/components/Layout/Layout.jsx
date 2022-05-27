import styles from "../../styles/Home.module.css";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
      <div className="flex flex-col">
        <Navbar />
        <main className={styles.main}>{children}</main>
        <footer className="text-center mt-10 mb-3">
          &copy; {new Date().getFullYear()} SportsVybe. All rights reserved.
        </footer>
      </div>
    );
}
