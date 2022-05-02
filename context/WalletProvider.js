import { createContext, useContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const defaultState = {
    wallet: "",
    signOutWallet: () => {},
    connectWallet: () => {},
};

const WalletContext = createContext(defaultState);

const WalletProvider = (props) => {
    const { children } = props;
    const [wallet, setWallet] = useState(null);

    const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();

    const signOutWallet = () => {
        setWallet(null);
        logout();
    };

    useEffect(() => {
        // if the user isAuthenticated then check if wallet is connected
        if (isAuthenticated) {
            checkIfWalletIsConnected();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const connectWallet = async () => {
        try {
            if (!isAuthenticated) {
                const account = await authenticate({ signingMessage: "Welcome to SportsVybe, please sign in to continue" });
                if (account) setWallet(account.get("ethAddress"));
                if (wallet) console.log("connected", account, account.get("ethAddress"));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (isAuthenticated) {
                const account = user.get("ethAddress");
                //set the current account
                setWallet(account);
                if (wallet) console.log("connected", user, account);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <WalletContext.Provider
            value={{
                wallet,
                isAuthenticating,
                signOutWallet,
                connectWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

const useWallet = () => useContext(WalletContext);

export { WalletProvider, useWallet };
