import styles from "./NetworkButton.module.css"
import { useAppKit } from "@reown/appkit/react"
import { useAppKitNetwork, useAppKitAccount } from "@reown/appkit/react"

export default function NetworkButton() {
  const { open } = useAppKit()
  const { chainId } = useAppKitNetwork()

  // TODO:// Get icon from config.js
  function renderIcon() {
    if (chainId == 1) {
      return icons.ethereum
    } else {
      return icons.arbitrum
    }
  }

  return (
    <button className={styles["network-button"]} onClick={() => open({ view: 'Networks' })}>
      <div className={styles["icon"]}>
        {/* Network Icon */}
        {/* <img src={icons.ethereum} alt="Chain Icon" /> */}
      </div>
      <div className={styles["network-name"]}>{renderNetwork()}</div>
    </button>
  )
} 