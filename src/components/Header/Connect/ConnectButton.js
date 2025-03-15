import styles from "./ConnectButton.module.css"
import { useAppKit } from '@reown/appkit/react'
import { useAppKitAccount } from "@reown/appkit/react"


function shortenAddress(addressStr) {
  return addressStr.slice(0, 4) + "..." + addressStr.slice(-4);
}
function renderAccount(isConnected, address) {
  if(isConnected) {
    return shortenAddress(address)
  } else {
    return "Connect Wallet"
  }
}

export default function ConnectButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()


  return (
    <button className={styles['connect-wallet']} onClick={() => open()}>{renderAccount(isConnected, address)}</button>
  )
}