import abi from "./abi.json";

export const moralis = {
    MORALIS_APP_ID: process.env.NEXT_PUBLIC_MORALIS_APP_ID,
    MORALIS_SERVER_URL: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL,
};

export const contractABI = abi.abi;

export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const tokenContractAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;
