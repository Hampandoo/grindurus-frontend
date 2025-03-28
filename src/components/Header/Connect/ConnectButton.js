import { useAppKitAccount, useDisconnect, useAppKit } from "@reown/appkit/react"

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

export default function ConnectButton({ setPoolId }) {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { disconnect } = useDisconnect()

  const handleHeaderClick = async (view) => {
    if (view == 'dashboard') {
      setPoolId(-1)
    }
  }

  return (
    <button 
      className="button connect-button" 
      onClick={() => open()}
    >
      {renderAccount(isConnected, address)}
    </button>
  )
}