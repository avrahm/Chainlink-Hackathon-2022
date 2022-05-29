import { ethers } from "ethers";
import { createContext, useContext, useState } from "react";
import { useMoralis } from "react-moralis";
import { contractABI, contractAddress } from "../configs/configs";

const ContractContext = createContext();

const ContractProvider = ({ children }) => {
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractMessage, setContractMessage] = useState(null);

    const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis();

    const getContract = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        return contract;
    };

    if (isWeb3Enabled) {
        console.log(web3);
        // return null;
    }

    const createTeam = async () => {
        setIsContractLoading(true);
        try {
            const contract = await getContract();

            const teamId = contract.functions
                .createTeam() // create team transaction
                .then((tx) => tx.wait()) // wait for transaction to be mined
                .then((tx) => {
                    setIsContractLoading(false);
                    setContractMessage({ statusColor: "green", message: "Successfully created team on chain!" });
                    return tx.events[0].args[0].toString(); // return teamId as string
                });
            return teamId;
        } catch (error) {
            setIsContractLoading(false);
            setContractMessage({ statusColor: "red", message: error.message });
            console.log(error);
            return false;
        }
    };

    const createChallenge = async (userTeamId, challengeTeamId, challengeAmount) => {
        setIsContractLoading(true);
        console.log("Contract! CreateChallenge: ", userTeamId, challengeTeamId, challengeAmount);
        try {
            const challengeAmountWei = ethers.utils.parseEther(challengeAmount);

            // create challenge transaction
            const contract = await getContract();

            const challengeId = contract.functions
                .createChallengePool(userTeamId, challengeTeamId, {
                    value: challengeAmountWei,
                    gasLimit: 3500000,
                })
                .then((tx) => tx.wait()) // wait for transaction to be mined
                .then((tx) => {
                    setIsContractLoading(false);
                    setContractMessage({ statusColor: "green", message: "Successfully created challenge on chain!" });
                    return tx.events[1].args.challenge_id.toString(); // return challengeId as string
                })
                .catch((error) => {
                    setIsContractLoading(false);
                    setContractMessage({ statusColor: "red", message: error.message });
                    console.error(error);
                    return false;
                });
            return challengeId;
        } catch (error) {
            setIsContractLoading(false);
            setContractMessage({ statusColor: "red", message: error.message });
            console.error(error);
            return false;
        }
    };

    return (
        <ContractContext.Provider
            value={{ createTeam, createChallenge, isContractLoading, contractMessage, setContractMessage, setIsContractLoading }}
        >
            {children}
        </ContractContext.Provider>
    );
};

const useContract = () => useContext(ContractContext);

export { ContractProvider, useContract };
