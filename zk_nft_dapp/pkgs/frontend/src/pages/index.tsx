import Loading from '@/components/Loading';
import { createSmartWallet, sendUserOp } from '@/hooks/biconomy';
import { TxData, createContract, createSafeMintTxData } from '@/hooks/useContract';
import styles from '@/styles/Home.module.css';
import { generateProof } from '@/utils/generateProof';
import { getEnv } from '@/utils/getEnv';
import { verifyRecaptcha } from '@/utils/verifyRecaptcha';
import { ChainId } from '@biconomy/core-types';
import Head from 'next/head';
import { useState } from "react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, logout } from './../hooks/web3auth';
import gameContractAbi from './../utils/abi.json';
import {
  NFT_ADDRESS,
  RPC_URL,
  TESTNET_OPENSEA_BASE_URL
} from './../utils/constants';

/**
 * Home Component
 * @returns 
 */
export default function Home() { 
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(ChainId.AVALANCHE_TESTNET)
  const [input0, setInput0] = useState<string>("")
  const [opening, setOpening] = useState<boolean>(true);
  const [verifyFlg, setVerifyFlg] = useState<boolean>(false);
  // reCAPTCHAからtokenを取得する No.2の処理
  const { executeRecaptcha } = useGoogleReCaptcha();

  /**
   * logIn method
   */
  const logIn = async () => {
    try {
      setLoading(true);

      // init UseContract instance
      createContract(NFT_ADDRESS, gameContractAbi, RPC_URL);
      // login & create signer
      const signer = await login(chainId, RPC_URL);

      console.log("signer:", signer)
     
      // create smartWallet
      const {
        smartContractAddress: smartWalletAddress,
      } = await createSmartWallet(chainId, signer);

      console.log("smartWalletAddress:", smartWalletAddress)

      setAddress(smartWalletAddress)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  /**
   * logout
   */
  const logOut = async() => {
    await logout();
    setVerifyFlg(false);
    setAddress("");
  }

  /**
   * reCAPTCHA method
   */
  const reCaptcha = async() => {
    if(executeRecaptcha) { 
      try {
        setLoading(true);
        const token: string = await executeRecaptcha('login');
        // ReCaptchaによる検証を実施
        const responceJson_recaptcha = await verifyRecaptcha(token);
        console.log("responce_server:", responceJson_recaptcha);
        setVerifyFlg(responceJson_recaptcha.success);
      } catch(err) {
        console.error("error:", err);
      } finally {
        setLoading(false)
      }
    } 
  }

  /**
   * sendTransaction method
   */
  const sendTransaction = async () => {
    try {
      setLoading(true)
      console.log("==================== start ====================")

      toast.info('Verifying & Minting your NFT...', {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
       });

      // create ZK Proof data
      const env = await getEnv();
      const proofs = await generateProof(input0, env.SECRET_HASH);
      // create txData
      const txData: TxData = await createSafeMintTxData(
                                      address, 
                                      proofs.proof_a, 
                                      proofs.proof_b, 
                                      proofs.proof_c, 
                                      proofs.publicSignals
                                    );
      
      // call mintNFT method
      const transactionHash = await sendUserOp(txData);
      console.log("tx Hash:", transactionHash)

      toast.success(`Success! Here is your transaction:${transactionHash} `, {
        position: "top-right",
        autoClose: 18000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    
    } catch(err: any) {
      console.error("error occurred while verifying & mint NFT.. :", err)
      toast.error(`Error occurred while verifying & mint NFT..`, {
        position: "top-right",
        autoClose: 18000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      console.log("====================  end ====================")
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>ZK NFT Dapp</title>
        <meta name="description" content="Based Account Abstraction" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.neonText}>
          ZK NFT Dapp
        </h1>
        <h3> 
          { address && ( 
            <>
              <div>
                GetしたNFTは、
                <a 
                  href={TESTNET_OPENSEA_BASE_URL + address} 
                  target="_blank"
                >
                  ここ
                </a>
                でみれるよ!!
              </div>
              <h3>
                正しいSECRETの値を入力して<br/>
                NFTをミントしよう!!
              </h3>
            </> 
          )}
        </h3>
        {loading ? (
          <p><Loading/></p>
        ) : (
          <>
            <div></div>
            {address ? (
              <>
                {!verifyFlg ? (
                  <button 
                    disabled={!opening}
                    onClick={reCaptcha} 
                    className={`${styles.connect} ${styles.playButton}`}
                  >
                    Verify I`m not a bot
                  </button>
                ) : (
                  <>
                    <form>
                      <label htmlFor="secret">Secret:</label><br/>
                      <textarea
                        id="secret" 
                        name="secret" 
                        onChange={(e: any) => setInput0(e.target.value)}
                        value={input0}
                      /><br/>
                      <button 
                        disabled={!opening}
                        onClick={sendTransaction} 
                        className={`${styles.connect} ${styles.playButton}`}
                      >
                        Let`s Mint
                      </button>
                    </form>
                    <br />
                    <button 
                      onClick={logOut} 
                      className={styles.authButton}
                    >
                      LogOut
                    </button>  
                  </>
                )}  
              </>    
            ) : (
              <button 
                onClick={logIn} 
                className={styles.authButton}
              >
                Let`s Start
              </button>
            )}
          </>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </main>
    </>
  )
}
