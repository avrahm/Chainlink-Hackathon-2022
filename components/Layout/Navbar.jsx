import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Navbar() {
    const [user, setUser] = useState(null);

    return (
        <div className={styles.nav}>
            <div className={styles.logo}>
                <div className="p-3 rounded bg-green-100">Logo</div>
            </div>
            <div className="px-4">
                <Link href="/" className="px-2">
                    Home
                </Link>
            </div>
            {user ? (
                <div className="px-4">
                    <strong>{user.displayName}</strong>
                    <button className="rounded-full bg-green-200 px-2 py-1 mx-4">Disconnect Wallet</button>
                </div>
            ) : (
                <button className="rounded-full bg-green-200 px-2 py-1 mx-4">Connect Wallet</button>
            )}
        </div>
    );
}
