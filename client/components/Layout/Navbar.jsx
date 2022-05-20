import Image from "next/image";
import Link from "next/link";
import { useWallet } from "../../context/WalletProvider";
import styles from "../../styles/Home.module.css";

export default function Navbar() {
    const { connectWallet, wallet, signOutWallet, isAuthenticating, isAuthenticated } = useWallet();

    return (
        <div className={styles.nav}>
            <div className="px-4 items-center">
                <Image src="/logo_blackvybe.png" alt="SportsVybe Logo" width={125} height={25} />
            </div>
            <div className="px-4">
                <Link href="/" className="px-2">
                    Home
                </Link>
            </div>
            <div className="px-4">
                <Link href="/teams" className="px-2">
                    Teams
                </Link>
            </div>
            <div className="px-4">
                <Link href="/event" className="px-2">
                    Event
                </Link>
            </div>
            {isAuthenticated && (
                <>
                    <div className="px-4">
                        <Link href="/profile" className="px-2">
                            Profile
                        </Link>
                    </div>
                    <div className="px-4">
                        <Link href="/challenges" className="px-2">
                            Challenges
                        </Link>
                    </div>
                </>
            )}
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
