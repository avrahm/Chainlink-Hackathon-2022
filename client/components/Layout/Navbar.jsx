import Image from "next/image";
import Link from "next/link";
import { useWallet } from "../../context/WalletProvider";
import headerLogo from "../../public/header_logo.png";
import styles from "../../styles/Home.module.css";

export default function Navbar() {
    const { connectWallet, wallet, signOutWallet, isAuthenticating } = useWallet();

    return (
        <div className={styles.nav}>
            <div>
                <Image src={headerLogo} alt="SportsVybe Logo" width={120} height={30} />
            </div>

            <div className="px-4">
                <Link href="/" className="px-2">
                    Home
                </Link>
            </div>
            <div className="px-4">
                <Link href="/profile" className="px-2">
                    Profile
                </Link>
            </div>
            <div className="px-4">
                <Link href="/teams" className="px-2">
                    Teams
                </Link>
            </div>
            <div className="px-4">
                {wallet ? (
                    <button
                        disabled={isAuthenticating}
                        className="rounded-full bg-green-200 px-2 py-1 mx-4  disabled:bg-gray-400"
                        onClick={() => signOutWallet()}
                    >
                        Disconnect {wallet.substring(0, 5)}
                    </button>
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
        </div>
    );
}
