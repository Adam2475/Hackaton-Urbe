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
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

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
        {
          id: prodotto.id,
          nome: prodotto.nome,
          quantita: quantity,
          prezzo: prodotto.prezzo,
        },
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

  // Funzione per completare l'ordine e svuotare il carrello
  const handleOrderSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Ordine confermato:", cart);
      setCart([]);
      setLoading(false);
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        setCartOpen(false);
      }, 3000);
    }, 2000);
  };

  // Calcola il totale del carrello
  const totalAmount = cart.reduce((total, item) => total + item.quantita * item.prezzo, 0);

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
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
                  sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": prodotto.disponibilita === 0 ? { borderColor: "red" } : {},
                  }}
                  disabled={prodotto.disponibilita === 0}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color={prodotto.disponibilita > 0 ? "primary" : "error"}
                  onClick={() => handleAddToCart(prodotto)}
                  disabled={prodotto.disponibilita === 0}
                >
                  {prodotto.disponibilita > 0 ? "Aggiungi al Carrello" : "Esaurito"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottone per aprire il carrello */}
      <Box sx={{ mt: 5 }}>
        <Button variant="contained" color="primary" onClick={() => setCartOpen(true)}>
          Vai al Carrello
        </Button>
      </Box>

      {/* Dialog del carrello */}
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Carrello</DialogTitle>
        <DialogContent>
          {orderSuccess ? (
            <Typography variant="h6" color="success.main" sx={{ mt: 4, textAlign: "center" }}>
              ✅ Ordine effettuato con successo!
            </Typography>
          ) : cart.length === 0 ? (
            <Typography>Nessun prodotto nel carrello.</Typography>
          ) : (
            <List>
              {cart.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`${item.nome} - Quantità: ${item.quantita}`}
                    secondary={`Totale: €${(item.quantita * item.prezzo).toFixed(2)}`}
                  />
                  <IconButton edge="end" onClick={() => handleRemoveFromCart(item.id, item.quantita)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        {!orderSuccess && (
          <DialogActions>
            <Typography sx={{ ml: 2 }}>Totale: €{totalAmount.toFixed(2)}</Typography>
            <Button onClick={handleOrderSubmit} variant="contained" color="secondary">
              {loading ? <CircularProgress size={24} /> : "Ordina e Paga"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Container>
  );
}
