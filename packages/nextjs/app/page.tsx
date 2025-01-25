"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import AuthForm from "../components/AuthForm";
import { Container, Typography, Button, Box } from "@mui/material";
import { useBalance } from 'wagmi'

export default function Login() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  });

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
    </Container>
  );
}
