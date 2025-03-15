import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { sepolia, mainnet } from '@reown/appkit/networks'

import config from "./config"

const projectId = "ff90ca3a23aaaaf5a5ee02df6bf92ff2"
const networks = [sepolia, mainnet]
 
createAppKit({
  themeMode: "light",
  adapters: [new EthersAdapter()],
  networks,
  projectId,
  defaultNetwork: sepolia,
  chainImages: {
    42161: config.arbitrum.logo,
    // 1: config.ethereum,
    // 11155111: config.ethereum
  },
  features: {
    analytics: true,
    connectMethodsOrder: ['wallet']
  }
})
