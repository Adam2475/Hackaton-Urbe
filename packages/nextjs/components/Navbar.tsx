
import { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Gestione apertura/chiusura menu profilo
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    // Logout function (esempio: svuotare localStorage e reindirizzare)
    const handleLogout = () => {
        localStorage.removeItem("userType");
        setAnchorEl(null);
        window.location.href = "/login";
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: "linear-gradient(135deg, #1e3c72 30%, #2a5298 90%)",
                boxShadow: "none",
                padding: "0 20px",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
               

                {/* Logo */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Gestionale Aziendale
                </Typography>

                {/* Search Bar */}
                <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
                    <InputBase
                        placeholder="Cerca ordini, prodotti..."
                        sx={{
                            bgcolor: "rgba(255,255,255,0.15)",
                            color: "white",
                            borderRadius: 1,
                            padding: "6px 12px",
                            width: "100%",
                        }}
                    />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                </Box>

                {/* Icone a destra */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                        <AccountCircle />
                    </IconButton>

                    {/* Menu a tendina per il profilo utente */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                    >
                        <MenuItem onClick={handleProfileMenuClose}>Profilo</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Impostazioni</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
