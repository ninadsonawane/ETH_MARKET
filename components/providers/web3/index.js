const { createContext, useContext, useEffect, useState } = require("react");
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
const Web3Context = createContext(null);

export default function Web3Provider ({children}) {
  const [web3api, setWeb3api] = useState({
    web3:null,
    contract:null,
    provider:null,
    isInitialized:false
  })
  useEffect(() => {
   const loadProvider = async () => {
   const provider = await detectEthereumProvider();
   if(provider) {
   const web3 = new Web3(provider);
   setWeb3api({
    web3,
    provider,
    contract:null,
    isInitialized:true
   })
   } else {
    setWeb3api(api => ({...api, isInitialized:true}))
    console.error("Please, install Metamask.")
   }
   }
   loadProvider()
  },[])
  return (
    <Web3Context.Provider value={web3api}>
        {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
    return useContext(Web3Context)
}
