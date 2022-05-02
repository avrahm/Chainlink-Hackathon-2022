import Link from "next/link";
import { useWallet } from "../../context/WalletProvider";
import styles from "../../styles/Home.module.css";

export default function Navbar() {
    const { connectWallet, wallet, signOutWallet, isAuthenticating } = useWallet();

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
            {wallet ? (
                <div className="px-4">
                    <button
                        disabled={isAuthenticating}
                        className="rounded-full bg-green-200 px-2 py-1 mx-4  disabled:bg-gray-400"
                        onClick={() => signOutWallet()}
                    >
                        Disconnect {wallet.substring(0, 5)}
                    </button>
                </div>
            ) : (
                <button
                    disabled={isAuthenticating}
                    className="rounded-full bg-green-200 px-2 py-1 mx-4 disabled:bg-gray-400"
                    onClick={() => connectWallet()}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
}
