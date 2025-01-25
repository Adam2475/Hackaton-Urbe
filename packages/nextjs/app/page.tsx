"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import AuthForm from "../components/AuthForm";
import { Container, Typography, Button, Box } from "@mui/material";

export default function Login() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", paddingTop: "50px" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Safepayaments
      </Typography>

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
