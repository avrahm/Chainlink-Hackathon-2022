import styles from "../../styles/Home.module.css";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col">
            <Navbar />
            <main className={styles.main}>{children}</main>
        </div>
    );
}
