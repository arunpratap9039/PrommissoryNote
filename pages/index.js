import Link from "next/link";
import React, {useState, useEffect} from "react";
import styles from "./page.module.css";
import { setRequestMeta } from "next/dist/server/request-meta";
import { ethers } from "ethers";

// start, create the login with authentication
function HomePage() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

  useEffect(() => {
    setIsMetamaskInstalled(!!window.ethereum);
  }, []);

  async function handleMetamaskLogin() {


  }


  return (
    <div className={styles.container}>
      <h1>Let's go for a contract</h1>
      <p>Please select an option below to continue:</p>
      <div>
      <button className={styles.btn} onClick={handleMetamaskLogin}>Login with Metamask</button>
      <br />
      <br />
    </div>
        <Link href="/signup">
          <button className={styles.btn}>Signup</button>
        </Link>
      </div>
  );
}

export default HomePage;