"use client";

import { Alert, Box, Button } from "@mui/material";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box className="p-8">
      <Alert
        severity="error"
        className="mb-4"
        action={
          <>
            <Button color="inherit" onClick={reset} sx={{ mr: 1 }}>
              Try Again
            </Button>
            <Button color="inherit" component={Link} href="/">
              Return to Home
            </Button>
          </>
        }
      >
        Something went wrong with the registration form.
      </Alert>
    </Box>
  );
}
