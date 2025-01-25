"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Container, Typography, Card, CardContent, Table,
    TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Box, useMediaQuery
} from "@mui/material";

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
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}