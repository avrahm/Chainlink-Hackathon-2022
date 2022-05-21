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

    return (
        <ContractContext.Provider value={{ createTeam, isContractLoading, contractMessage, setContractMessage, setIsContractLoading }}>
            {children}
        </ContractContext.Provider>
    );
};

const useContract = () => useContext(ContractContext);

export { ContractProvider, useContract };
