import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "next/link";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const { title } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            {title}
          </Link>
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link
            href="/"
            passHref
            style={{
              color: "inherit",
              textDecoration: "none",
              marginLeft: "16px",
            }}
          >
            Home
          </Link>
          <Link
            href="/about"
            passHref
            style={{
              color: "inherit",
              textDecoration: "none",
              marginLeft: "16px",
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            passHref
            style={{
              color: "inherit",
              textDecoration: "none",
              marginLeft: "16px",
            }}
          >
            Contact
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
