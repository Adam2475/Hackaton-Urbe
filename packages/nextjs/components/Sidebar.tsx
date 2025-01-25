
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, ListItemButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useRouter } from "next/navigation";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const router = useRouter();

    // Definizione delle voci di menu
    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Ordini", icon: <ShoppingCartIcon />, path: "/dashboard/ordini" },
        { text: "Clienti", icon: <PeopleIcon />, path: "/dashboard/clienti" },
        { text: "Statistiche", icon: <BarChartIcon />, path: "/dashboard/statistiche" },
    ];

    return (
        <Drawer anchor="left" open={open} onClose={onClose} sx={{ "& .MuiDrawer-paper": { width: 300, bgcolor: "#f5f5f5" } }}>
            <List>
                {/* Header del menu con titolo e icona di chiusura */}
                <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#2a5298", color: "#fff" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Menu
                    </Typography>
                    <CloseIcon onClick={onClose} sx={{ cursor: "pointer", color: "#fff" }} />
                </ListItem>

                <Divider />

                {/* Voci di menu con ListItemButton */}
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                router.push(item.path);
                                onClose();
                            }}
                            sx={{
                                "&:hover": { bgcolor: "#2a5298", color: "#fff" },
                                transition: "0.3s",
                            }}
                        >
                            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}

                <Divider />

                {/* Pulsante di chiusura del menu */}
                <ListItem disablePadding>
                    <ListItemButton onClick={onClose}>
                        <ListItemText primary="Chiudi Menu" sx={{ textAlign: "center", fontWeight: "bold" }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
