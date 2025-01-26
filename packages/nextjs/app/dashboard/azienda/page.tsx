"use client";

import { useEffect, useState } from "react";
import { useReadContract } from 'wagmi'
import { useRouter } from "next/navigation";
import {
    Container, Typography, Card, CardContent, Table,
    TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Box, useMediaQuery
} from "@mui/material";

const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_usdcTokenAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "AlreadyPayed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidAmount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidPayer",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotEnoughMoney",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotPayed",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "contributor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "PaymentMade",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalTransaction",
          "type": "uint256"
        }
      ],
      "name": "totalTransaction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "WeiAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "transactionLog",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "wallet",
          "type": "address"
        }
      ],
      "name": "getTransactionsReceivedByAddress",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amountWei",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct project.Transaction[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "payer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "arbiter",
          "type": "address"
        }
      ],
      "name": "pre_payment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalFunds",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountWei",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdcTokenAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
const contractAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
export const wagmiContractConfig = {
  addressOrName: contractAddress,
  contractInterface: contractABI,
};
// Definizione dati fittizi dei prodotti
const prodotti = [
    { nome: "Acqua Naturale", quantita: 100, ultimoOrdine: "2024-01-15", prezzo: 1.0 },
    { nome: "Acqua Frizzante", quantita: 50, ultimoOrdine: "2024-01-10", prezzo: 1.2 },
    { nome: "Vino Bianco", quantita: 30, ultimoOrdine: "2024-01-05", prezzo: 5.5 },
    { nome: "Vino Rosso", quantita: 40, ultimoOrdine: "2024-01-07", prezzo: 6.0 },
    { nome: "Coca Cola", quantita: 80, ultimoOrdine: "2024-01-12", prezzo: 2.0 },
    { nome: "Fanta", quantita: 60, ultimoOrdine: "2024-01-14", prezzo: 1.8 },
    { nome: "Birra", quantita: 90, ultimoOrdine: "2024-01-16", prezzo: 3.0 },
    { nome: "Sprite", quantita: 90, ultimoOrdine: "2024-01-16", prezzo: 3.0 },
    { nome: "RedBull", quantita: 90, ultimoOrdine: "2024-01-16", prezzo: 3.0 },

];

// Calcolo bilancio
const totaleIncassato = prodotti.reduce((acc, item) => acc + item.quantita * item.prezzo, 0);
const totaleSpeso = 1500; // Esempio di spese
export default function AziendaDashboard() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        if (userType !== "azienda") {
            router.push("/login");
        }
    }, []);

    // const { data: transactions, isLoading, isError } = useReadContract({
    //     ...wagmiContractConfig,
    //     functionName: 'getTransactionsReceivedByAddress',
    //     args: [contractAddress],
    // });
    // const { data, isLoading, isError } = useReadContract({
    //     ...wagmiContractConfig,
    //     functionName: 'getTransactionsReceivedByAddress',
    //     args: [contractAddress],
    //     query: {
    //         enabled: !!contractAddress,
    //       },
    // })
    // console.log()
    // Verifica che 'data' non sia undefined e poi usa i dati.
    // let transactions = [];
    // if (data) {
    //     const [senderr, amounts, timestamps] = data; // Se 'data' è un array, estrai i valori
    //     transactions = senders.map((sender, index) => ({
    //         sender,
    //         amountWei: amounts[index],
    //         timestamp: timestamps[index],
    //     }));
    // }
    const transactions = [
        { sender: '0xAddress1', amountWei: 1000, timestamp: 1617894000 },
        { sender: '0xAddress2', amountWei: 2000, timestamp: 1617894600 },
    ];
    
    console.log('Transactions:', transactions);
    
    console.log('Transactions:', transactions);
    return (
        <div>
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Dashboard Gestionale
                </Typography>

                {/* Card contenente la tabella prodotti e bilancio */}
                <Card sx={{ maxWidth: 900, margin: "0 auto", boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Gestione Ordini
                        </Typography>

                        {/* Tabella Prodotti - Scrolling orizzontale su mobile */}
                        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#2a5298" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Prodotto</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Quantità</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Ultimo Ordine</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Prezzo (€)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {prodotti.map((prodotto, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{prodotto.nome}</TableCell>
                                            <TableCell align="right">{prodotto.quantita}</TableCell>
                                            <TableCell align="right">{prodotto.ultimoOrdine}</TableCell>
                                            <TableCell align="right">{prodotto.prezzo.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Bilancio - Disposizione differente su mobile */}
                        <Box
                            sx={{
                                mt: 4,
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                gap: 2,
                                textAlign: "center",
                            }}
                        >
                            <Card sx={{ bgcolor: "#e3f2fd", padding: 2, flex: 1 }}>
                                <Typography variant="h6" color="primary">
                                    Totale Incassato
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    € {totaleIncassato.toFixed(2)}
                                </Typography>
                            </Card>

                            <Card sx={{ bgcolor: "#ffebee", padding: 2, flex: 1 }}>
                                <Typography variant="h6" color="error">
                                    Totale Speso
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    € {totaleSpeso.toFixed(2)}
                                </Typography>
                            </Card>

                            <Card sx={{ bgcolor: "#e8f5e9", padding: 2, flex: 1 }}>
                                <Typography variant="h6" color="success">
                                    Saldo Finale
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    € {(totaleIncassato - totaleSpeso).toFixed(2)}
                                </Typography>
                            </Card>
                        </Box>

                        {/* Se ci sono transazioni ricevute, mostralo */}
                        {Array.isArray(transactions) ? (
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" gutterBottom>
                                    Transazioni Ricevute
                                </Typography>
                                <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                                    <Table>
                                        <TableHead sx={{ backgroundColor: "#2a5298" }}>
                                            <TableRow>
                                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mittente</TableCell>
                                                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Importo</TableCell>
                                                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Data</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transactions.map((transaction, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{transaction.sender}</TableCell>
                                                    <TableCell align="right">{transaction.amountWei}</TableCell> {/* Correzione nel nome della proprietà */}
                                                    <TableCell align="right">{new Date(transaction.timestamp * 1000).toLocaleString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ) : (
                            <Typography>No transactions found</Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
