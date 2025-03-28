import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { arbitrum, base, polygon, optimism} from '@reown/appkit/networks'

import config from "./config"

const projectId = "ff90ca3a23aaaaf5a5ee02df6bf92ff2"
const networks = [arbitrum, base, polygon, optimism];
 
createAppKit({
  themeMode: "dark",
  adapters: [new EthersAdapter()],
  networks,
  projectId,
  defaultNetwork: arbitrum,
  chainImages: {
    42161: config.arbitrum.logo,
    8453: config.base.logo,
    137: config.polygon.logo,
    10: config.optimism.logo,
  },
  features: {
    analytics: true,
    connectMethodsOrder: ['wallet']
  }
})
