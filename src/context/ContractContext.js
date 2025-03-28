import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import {useAppKitAccount, useAppKitNetwork, useAppKitProvider} from "@reown/appkit/react";
import {convertDecimalToHex} from "../components/utils/numbers";
import config from "../config";

const ContractContext = createContext();
const poolsAbi = config.poolsNFTAbi;

export const ContractProvider = ({ children,}) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [networkConfig, setNetworkConfig] = useState({});
  const [poolsNFT, setPoolsNFT] = useState(null);

  const { walletProvider } = useAppKitProvider('eip155');
  const { isConnected } = useAppKitAccount();
  const { chainId} = useAppKitNetwork();

  const contractCache = useMemo(() => new Map(), [])

  useEffect(() => {
    if (provider) {
      provider.getSigner().then(setSigner).catch(console.error);
    }
  }, [provider]);

  useEffect(() => {
    const chainToUse = convertDecimalToHex(chainId);
    const networkKey = Object.keys(config).find(
      (key) => config[key].chainId && config[key].chainId.toLowerCase() === chainToUse.toLowerCase()
    );
    setNetworkConfig(config[networkKey] || {});
  }, [chainId]);

  useEffect(() => {
    if (isConnected && walletProvider) {
      setProvider(new ethers.BrowserProvider(walletProvider));
    } else {
      setProvider(null);
      setSigner(null);
    }
  }, [isConnected, walletProvider]);

  useEffect(() => {
    const { poolsnft: address } = networkConfig ?? {};

    if (signer && address && poolsAbi) {
      if (contractCache.has(address)) {
        setPoolsNFT(contractCache.get(address));
        return;
      }

      const contractInstance = new ethers.Contract(address, poolsAbi, signer);
      setPoolsNFT(contractInstance);
      contractCache.set(address, contractInstance);
    } else {
      setPoolsNFT(null);
    }
  }, [signer, networkConfig, poolsAbi, provider, signer]);


  return (
    <ContractContext.Provider value={{ provider, poolsNFT, networkConfig, setNetworkConfig, isConnected, signer }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractService = () => {
  return useContext(ContractContext);
};