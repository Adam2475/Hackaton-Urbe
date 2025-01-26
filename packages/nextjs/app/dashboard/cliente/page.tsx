"use client";
import { useEffect, useState } from "react";
import contractABI from "/Users/giulio/Desktop/Hackaton-Urbe/packages/hardhat/artifacts/contracts/YourContract.sol/project.json";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Badge,
  LinearProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CONTRACT_ADDRESS = "0xYourContractAddress"; // Sostituisci con l'indirizzo del tuo contratto
// Prodotti disponibili
const initialProducts = [
  { id: 1, nome: "Acqua Naturale", prezzo: 1.0, disponibilita: 100 },
  { id: 2, nome: "Acqua Frizzante", prezzo: 1.2, disponibilita: 50 },
  { id: 3, nome: "Vino Bianco", prezzo: 5.5, disponibilita: 30 },
  { id: 4, nome: "Vino Rosso", prezzo: 6.0, disponibilita: 40 },
  { id: 5, nome: "Coca Cola", prezzo: 2.0, disponibilita: 80 },
  { id: 6, nome: "Fanta", prezzo: 1.8, disponibilita: 60 },
  { id: 7, nome: "Birra", prezzo: 3.0, disponibilita: 90 },
  { id: 8, nome: "Sprite", prezzo: 3.0, disponibilita: 90 },
  { id: 9, nome: "Redbull", prezzo: 3.0, disponibilita: 90 },
];

export default function ClienteDashboard() {
  const router = useRouter();
  const [prodotti, setProdotti] = useState(initialProducts);
  const [cart, setCart] = useState<{ id: number; nome: string; quantita: number; prezzo: number }[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [transactionResult, setTransactionResult] = useState<string | null>(null);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "cliente") {
      router.push("/login");
    }
  }, [router]);

  // Gestisce il cambiamento della quantità nei campi di input
  const handleQuantityChange = (id: number, value: string, max: number) => {
    let quantity = parseInt(value, 10) || 0;
    quantity = Math.min(quantity, max);
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  // Aggiungi prodotto al carrello e aggiorna la disponibilità
  const handleAddToCart = (prodotto: any) => {
    const quantity = quantities[prodotto.id] || 0;
    if (quantity > 0 && quantity <= prodotto.disponibilita) {
      setCart((prevCart) => [
        ...prevCart,
        { id: prodotto.id, nome: prodotto.nome, quantita: quantity, prezzo: prodotto.prezzo },
      ]);

      setProdotti((prevProdotti) =>
        prevProdotti.map((item) =>
          item.id === prodotto.id ? { ...item, disponibilita: item.disponibilita - quantity } : item
        )
      );

      setQuantities((prev) => ({ ...prev, [prodotto.id]: 0 }));
    }
  };

  // Funzione per rimuovere un prodotto dal carrello e aggiornare la disponibilità
  const handleRemoveFromCart = (id: number, quantita: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    setProdotti((prevProdotti) =>
      prevProdotti.map((item) =>
        item.id === id ? { ...item, disponibilita: item.disponibilita + quantita } : item
      )
    );
  };

  // Funzione per completare il pagamento
  const handlePaymentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTransactionResult(null);

    setTimeout(() => {
      const success = Math.random() > 0.2; // Simula il successo con 80% di probabilità
      setLoading(false);
      setTransactionResult(success ? "success" : "error");

      setTimeout(() => {
        setPaymentOpen(false);
        setTransactionResult(null);
        setCart([]); // Svuota il carrello dopo il pagamento
      }, 4000);
    }, 4000);
  };

  // Calcola il totale del carrello
  const totalAmount = cart.reduce((total, item) => total + item.quantita * item.prezzo, 0);

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <AppBar
        position="static"
        sx={{
        background: "linear-gradient(135deg, #1e3c72 30%, #2a5298 90%)",
        width: "fit-content",
        borderRadius: 1,
        mt: 2,
        ml: "auto",
        mr: 2,
        boxShadow: "none",
      }}
    >
  <Toolbar sx={{ minHeight: "48px", padding: "0 8px" }}>
    <IconButton color="inherit" onClick={() => setCartOpen(true)}>
      <Badge badgeContent={cart.length} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  </Toolbar>
</AppBar>


      <Typography variant="h4" gutterBottom>
        Dashboard Cliente
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Seleziona i prodotti e aggiungili al carrello.
      </Typography>

      <Grid container spacing={3}>
        {prodotti.map((prodotto) => (
          <Grid item xs={12} sm={6} md={4} key={prodotto.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{prodotto.nome}</Typography>
                <Typography variant="body1" color="text.secondary">
                  Prezzo: €{prodotto.prezzo.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Disponibilità: {prodotto.disponibilita}
                </Typography>
                <TextField
                  type="number"
                  label="Quantità"
                  variant="outlined"
                  fullWidth
                  inputProps={{ min: 0, max: prodotto.disponibilita }}
                  value={quantities[prodotto.id] || ""}
                  onChange={(e) => handleQuantityChange(prodotto.id, e.target.value, prodotto.disponibilita)}
                  sx={{ mt: 2 }}
                  disabled={prodotto.disponibilita === 0}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(prodotto)}
                  disabled={prodotto.disponibilita === 0}
                >
                  Aggiungi al Carrello
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 5, width: "100%" }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#ff5722",  // Colore arancione distintivo
            "&:hover": { bgcolor: "#e64a19" },  // Colore più scuro quando ci passi sopra
            width: "100%",  // Rendi il pulsante largo quanto il contenitore
            py: 2,  // Aggiungi padding verticale per renderlo più alto
            fontSize: "1.2rem",  // Ingrandisci il testo
            fontWeight: "bold",
          }}
          onClick={() => setCartOpen(true)}
        >
          Vai al Carrello
        </Button>
      </Box>

      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Carrello</DialogTitle>
        <DialogContent>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText primary={`${item.nome} - Quantità: ${item.quantita}`} />
                <IconButton onClick={() => handleRemoveFromCart(item.id, item.quantita)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Typography>Totale: €{totalAmount.toFixed(2)}</Typography>
          <Button onClick={() => setPaymentOpen(true)} variant="contained" color="secondary">
            Ordina e Paga
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={paymentOpen} onClose={() => setPaymentOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Pagamento</DialogTitle>
        <DialogContent>
          <form onSubmit={handlePaymentSubmit}>
            <TextField name="address" label="Indirizzo destinatario" fullWidth required sx={{ mt: 2 }} />
            <TextField name="value" label="Importo (€)" fullWidth required value={totalAmount} disabled sx={{ mt: 2 }} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Invia Pagamento
            </Button>
          </form>
          {loading && <LinearProgress sx={{ mt: 2 }} />}
          {transactionResult && (
            <Typography sx={{ textAlign: "center", mt: 3, fontSize: "1.5rem", fontWeight: "bold" }}>
              {transactionResult === "success" ? "✅ Transazione completata!" : "❌ Transazione fallita!"}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
