import { MoralisProvider } from "react-moralis";
import Layout from "../components/Layout/Layout";
import { moralis } from "../configs/configs";
import { ContractProvider } from "../context/ContractProvider";
import { WalletProvider } from "../context/WalletProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider appId={moralis.MORALIS_APP_ID} serverUrl={moralis.MORALIS_SERVER_URL}>
            <WalletProvider>
                <ContractProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ContractProvider>
            </WalletProvider>
        </MoralisProvider>
    );
}

export default MyApp;
