import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import LoadingIndicator from '@/components/LoadingIndicator';
import { executeTransaction } from '@/lib/executeTransaction';
import { Button, Grid, Group, Input, Space, Stack, Text, Title } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import axios, { AxiosRequestConfig } from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import { useAccount } from 'wagmi';

/**
 * Home Component
 * @returns 
 */
export default function Home() {
  const [input0, setInput0] = useState("");
  const [input1, setInput1] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useAccount
  const { isConnected } = useAccount();
  
  /**
   * handleGenerateProofSendTransaction method
   * @param e 
   */
  const handleGenerateProofSendTransaction = async (e: any) => {
    e.preventDefault();
    
    // We will send an HTTP request with our inputs to our next.js backend to 
    // request a proof to be generated.
    const data = {
      input0,
      input1,
    }
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    // Send the HTTP request
    try {
      setIsLoading(true);
      // get proof data
      const res = await axios.post("/api/generate_proof", data, config);
      notifications.show({
        message: "Proof generated successfully! Submitting transaction...",
        color: "green",
      });

      // Split out the proof and public signals from the response data
      const { proof, publicSignals } = res.data;

      console.log("proof:", proof);
      console.log("publicSignals:", publicSignals);

      // call executeTransaction
      const txResult = await executeTransaction(proof, publicSignals);
      const txHash = txResult?.transactionHash;

      console.log("txHash:", txHash);

      setIsLoading(false);

      notifications.show({
        message: `Transaction succeeded! Tx Hash: ${txHash}`,
        color: "green",
        autoClose: false,
      });
    } catch (err: any) {
      const statusCode = err?.response?.status;
      const errorMsg = err?.response?.data?.error;
      setIsLoading(false);
      notifications.show({
        message: `Error ${statusCode}: ${errorMsg}`,
        color: "red",
      });
    }
  }
      
  /**
   * renderSubmitButton Component
   * @returns 
   */
  const renderSubmitButton = () => {
    if (!isConnected) {
      return <ConnectWalletButton />
    }
    return (
      <Button type="submit">
        Generate Proof & Send Transaction
      </Button>
    )
  }

  return (
    <>
      <Head>
        <title>ZK Simple Multiplier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack justify="center" align="center" w="100vw" h="100vh" spacing={0}>
        <Stack align="center" spacing={0}>
          <Group w="96vw" h="10vh" position="apart" align="center">
            <Title order={3}>
              ZK Simple Multiplier
            </Title>
            {/* ConnectWalletButton */}
            <ConnectWalletButton />
          </Group>
          <Grid align="center" justify="center" mih="80vh">
            {isLoading ? (
              <LoadingIndicator/>
            ) : (
              <Grid.Col sm={8} md={6} lg={4}>
                <Text>
                  {"Input two numbers between 0 and 5, inclusive. The two numbers must \
                  not be equal. We'll generate a ZK proof locally in the browser, and \
                  only the proof will be sent to the blockchain so that no one \
                  watching the blockchain will know the two numbers."}
                </Text>
                <Space h={20} />
                {/* form Component */}
                <form onSubmit={handleGenerateProofSendTransaction}>
                  <Stack spacing="sm">
                    <Input.Wrapper label="Input 0">
                      <Input 
                        placeholder="Number between 0 and 5" 
                        value={input0} 
                        onChange={(e) => setInput0(e.currentTarget.value)}
                      />
                    </Input.Wrapper>
                    <Input.Wrapper label="Input 1">
                      <Input 
                        placeholder="Number between 0 and 5" 
                        value={input1} 
                        onChange={(e) => setInput1(e.currentTarget.value)}
                      />
                    </Input.Wrapper>
                    <Space h={10} />
                    {/* renderSubmitButton Component */}
                    { renderSubmitButton() }
                  </Stack>
                </form>
              </Grid.Col>
            )}
          </Grid>
        </Stack>
      </Stack>
    </>
  )
}