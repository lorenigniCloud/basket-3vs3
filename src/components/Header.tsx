import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Keep Next.js Link for main navigation

// Import Material UI Link for breadcrumbs

interface HeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const Header = (props: HeaderProps) => {
  const { title, breadcrumbs } = props;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NextLink
              href="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {title}
            </NextLink>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NextLink
              href="/"
              passHref
              style={{
                color: "inherit",
                textDecoration: "none",
                marginLeft: "16px",
              }}
            >
              Home
            </NextLink>
            <NextLink
              href="/about"
              passHref
              style={{
                color: "inherit",
                textDecoration: "none",
                marginLeft: "16px",
              }}
            >
              About
            </NextLink>
            <NextLink
              href="/contact"
              passHref
              style={{
                color: "inherit",
                textDecoration: "none",
                marginLeft: "16px",
              }}
            >
              Contact
            </NextLink>
          </Box>
        </Toolbar>
      </AppBar>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Box sx={{ padding: "8px 16px", bgcolor: "grey.200" }}>
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return isLast ? (
                <Typography key={crumb.label} color="text.primary">
                  {crumb.label}
                </Typography>
              ) : (
                <NextLink key={crumb.label} href={crumb.href || "#"} passHref>
                  <MuiLink underline="hover" color="inherit">
                    {crumb.label}
                  </MuiLink>
                </NextLink>
              );
            })}
          </Breadcrumbs>
        </Box>
      )}
    </>
  );
};

export default Header;
