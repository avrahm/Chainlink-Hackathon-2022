import Head from "next/head";
import { Home } from "../components/Home";

export default function App() {
    return (
        <div className="mb-auto">
            <Head>
                <title>Chainlink Hackathon</title>
                <meta name="description" content="2022 Chainlink Hackathon" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Home />
        </div>
    );
}
