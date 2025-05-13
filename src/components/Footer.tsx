import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import React from "react";
import Typography from "@mui/material/Typography";

interface FooterProps {
  companyName: string;
  year: number;
}

const Footer = (props: FooterProps) => {
  const { companyName, year } = props;
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 3,
        mt: "auto", // Push footer to the bottom
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          {"© "}
          {year} {companyName}. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          <Link
            href="/privacy"
            style={{
              color: "inherit",
              textDecoration: "none",
              marginRight: "16px",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
