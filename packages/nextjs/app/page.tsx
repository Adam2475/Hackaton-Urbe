"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { WagmiProvider } from 'wagmi'
import AuthForm from "../components/AuthForm";
import { Container, Typography, Button, Box } from "@mui/material";
import { useBalance } from 'wagmi'
import { useTransaction } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

const { data: hash, sendTransaction } = useSendTransaction()

export default function Login() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  });

  //////////////////////////////

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", paddingTop: "50px" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Safepayaments
      </Typography>

     
      <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  
      {!isConnected ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => connect({ connector: injected() })}
        >
          Connetti Wallet
        </Button>
      ) : (
        <Box>
          <Typography variant="h6">Wallet: {address}</Typography>
          <Button variant="contained" color="secondary" onClick={() => disconnect()} sx={{ mt: 2 }}>
            Disconnetti
            
          </Button>
         
        </Box>
      )}

      <AuthForm />
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit">Send</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
    </Container>
  );
}
