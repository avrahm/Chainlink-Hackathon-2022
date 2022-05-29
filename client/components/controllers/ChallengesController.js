import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { useWallet } from "../../context/WalletProvider";
import ChallengesPage from "../views/ChallengesPage";

export const ChallengesController = () => {
    const { user, isAuthenticating, connectWallet } = useWallet();

    const [createdChallenges, setCreatedChallenges] = useState([]);
    const [againstChallenges, setAgainstChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getChallengesCreated = useMoralisQuery("challenges", (query) => query.equalTo("challengeTeam1Admin", user.get("username")), [], {
        autoFetch: true,
    });

    const getChallengesAgainst = useMoralisQuery("challenges", (query) => query.equalTo("challengeTeam2Admin", user.get("username")), [], {
        autoFetch: true,
    });

    useEffect(() => {
        const createdLoading = getChallengesCreated.isLoading;
        const againstLoading = getChallengesAgainst.isLoading;
        setIsLoading(createdLoading || againstLoading);
    }, [getChallengesCreated, getChallengesAgainst]);

    useEffect(() => {
        const getCreated = getChallengesCreated.fetch();
        getCreated
            .then((challenges) => {
                setCreatedChallenges(challenges);
            })
            .catch((err) => {
                console.error("err", err);
            });

        const getAgainst = getChallengesAgainst.fetch();
        getAgainst
            .then((challenges) => {
                setAgainstChallenges(challenges);
            })
            .catch((err) => {
                console.error("err", err);
            });
    }, []);

    return <ChallengesPage createdChallenges={createdChallenges} againstChallenges={againstChallenges} isLoading={isLoading} />;
};
