import { ethers } from "ethers";
import { createContext, useContext, useState } from "react";
import { contractABI, contractAddress } from "../configs/configs";

const ContractContext = createContext();

const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
};

const ContractProvider = ({ children }) => {
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractMessage, setContractMessage] = useState(null);

    const createTeam = async () => {
        setIsContractLoading(true);
        try {
            const teamId = await getContract()
                .functions.createTeam() // create team transaction
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
        console.log("Contract! createChallenge", userTeamId, challengeTeamId, challengeAmount);
        try {
            const challengeAmountWei = ethers.utils.parseEther(challengeAmount);
            console.log("challengeAmountWei", challengeAmountWei);
            // const challengeId = 0;
            const challengeId = await getContract()
                .functions.createChallengePool(userTeamId, challengeTeamId, challengeAmountWei, { value: challengeAmountWei }) // create challenge transaction
                .then((tx) => tx.wait()) // wait for transaction to be mined
                .then((tx) => {
                    setIsContractLoading(false);
                    setContractMessage({ statusColor: "green", message: "Successfully created challenge on chain!" });
                    return tx.events[0].args[0].toString(); // return challengeId as string
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
