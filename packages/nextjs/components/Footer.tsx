"use client";

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

/**
 * Footer component with copyright only
 */
export const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #1e3c72 30%, #2a5298 90%)",
        top: "auto",
        bottom: 0,
        padding: "10px 0",
        textAlign: "center",
        marginTop: "5%"
      }}
    >
      <Toolbar>
        <Typography variant="body2" sx={{ flexGrow: 1, color: "white" }}>
          © {new Date().getFullYear()} SafePayments. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
