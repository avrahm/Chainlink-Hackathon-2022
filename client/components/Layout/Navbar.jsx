import Image from "next/image";
import Link from "next/link";
import { forwardRef, useState } from "react";
import { useWallet } from "../../context/WalletProvider";

export default function Navbar() {
    const { connectWallet, wallet, signOutWallet, isAuthenticating, isAuthenticated } = useWallet();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="md:px-4 md:flex md:justify-between md:items-center border-b-2">
            <div className="flex items-center justify-between px-4">
                <div className="p-2 cursor-pointer">
                    <ImageRef href="/">
                        <Image src="/logo_blackvybe.png" alt="SportsVybe Logo" width={125} height={25} />
                    </ImageRef>
                </div>
                <div className="md:hidden p-2">
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className="block text-[#17362a] hover:text-green-600">
                        {isOpen ? (
                            <h1 className="text-3xl text-bold">✖</h1>
                        ) : (
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 100 80">
                                <rect width="100" height="20"></rect>
                                <rect y="30" width="100" height="20"></rect>
                                <rect y="60" width="100" height="20"></rect>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <div className={`px-4 pt-2 pb-4 md:pb-0 md:flex md:p-0 ${isOpen ? "block" : "hidden"}`}>
                <div className="md:flex list-none flex-row justify-between items-center flex-initial">
                    {!wallet && (
                        <>
                            <div className="block rounded px-2 py-1 mx-4 mb-3 md:mb-0 cursor-pointer hover:text-green-600">
                                <Link href="/" className="px-2">
                                    Home
                                </Link>
                            </div>
                        </>
                    )}

                    <div className="block rounded px-2 py-1 mx-4 mb-3 md:mb-0 cursor-pointer hover:text-green-600">
                        <Link href="/about" className="px-2">
                            About
                        </Link>
                    </div>
                    <div className="block rounded px-2 py-1 mb-3 md:mb-0 mx-4 cursor-pointer hover:text-green-600">
                        <Link href="/teams" className="px-2">
                            Teams
                        </Link>
                    </div>
                    <div className="block rounded px-2 py-1 mx-4 mb-3 md:mb-0 cursor-pointer hover:text-green-600">
                        <Link href="/event" className="px-2">
                            Events
                        </Link>
                    </div>
                    {isAuthenticated && (
                        <>
                            <div className="block rounded px-2 py-1 mx-4 mb-3 md:mb-0 cursor-pointer hover:text-green-600">
                                <Link href="/profile" className="px-2">
                                    My Profile
                                </Link>
                            </div>
                            <div className="block rounded px-2 py-1 mx-4 mb-6 md:mb-0 cursor-pointer hover:text-green-600">
                                <Link href="/challenges" className="px-2">
                                    My Challenges
                                </Link>
                            </div>
                        </>
                    )}
                </div>
                <div className="px-4 ">
                    {wallet ? (
                        <button
                            disabled={isAuthenticating}
                            className="block rounded-full cursor-pointer px-6 py-2  mx-2 bg-green-200  disabled:bg-gray-400 hover:bg-green-400"
                            onClick={() => signOutWallet()}
                        >
                            Disconnect {wallet.substring(0, 5)}
                        </button>
                    ) : (
                        <button
                            disabled={isAuthenticating}
                            className="block rounded-full cursor-pointer px-6 py-2  mx-2 bg-green-200   disabled:bg-gray-400 hover:bg-green-400"
                            onClick={() => connectWallet()}
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

const ImageRef = forwardRef(({ href, children }, ref) => {
    return (
        <a href={href} ref={ref}>
            {children}
        </a>
    );
});
