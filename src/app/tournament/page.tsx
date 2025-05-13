import { Alert, Box, Button } from "@mui/material";

import ErrorBoundary from "@/components/ErrorBoundary";
import Link from "next/link";
import { Metadata } from "next";
import TournamentRegistration from "../../components/TournamentRegistration";

export const metadata: Metadata = {
  title: "Tournament Registration",
  description: "Register your team for the 3v3 basketball tournament",
};

export default function TournamentPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Tournament Registration
      </h1>
      <ErrorBoundary
        fallback={
          <Box className="p-8">
            <Alert
              severity="error"
              className="mb-4"
              action={
                <Button color="inherit" component={Link} href="/">
                  Return to Home
                </Button>
              }
            >
              Something went wrong with the registration form.
            </Alert>
          </Box>
        }
      >
        <TournamentRegistration />
      </ErrorBoundary>
    </div>
  );
}
