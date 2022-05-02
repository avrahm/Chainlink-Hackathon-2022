import { MoralisProvider } from "react-moralis";
import Layout from "../components/Layout/Layout";
import { configs } from "../configs/configs";
import { WalletProvider } from "../context/WalletProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider appId={configs.MORALIS_APP_ID} serverUrl={configs.MORALIS_SERVER_URL}>
            <WalletProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </WalletProvider>
        </MoralisProvider>
    );
}

export default MyApp;
