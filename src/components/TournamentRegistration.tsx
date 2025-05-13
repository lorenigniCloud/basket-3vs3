"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import type {
  Player,
  RegistrationFormData,
  RegistrationState,
} from "@/actions/tournament";
import { useCallback, useState } from "react";

import TournamentPlayersSection from "./TournamentPlayersSection";
import { registerTeam } from "@/actions/tournament";
import { useActionState } from "react";

const POSITIONS = ["Guard", "Forward", "Center"];

const initialState: RegistrationState = {
  message: "",
  status: "idle",
};

const TournamentRegistration = () => {
  const theme = useTheme();
  const [players, setPlayers] = useState<Player[]>([
    { name: "", email: "", phoneNumber: "", position: "" },
    { name: "", email: "", phoneNumber: "", position: "" },
    { name: "", email: "", phoneNumber: "", position: "" },
  ]);
  const [teamName, setTeamName] = useState("");

  const [state, formAction, isPending] = useActionState(
    async (prevState: RegistrationState, formData: FormData) => {
      const data: RegistrationFormData = {
        teamName: formData.get("teamName") as string,
        players: players.filter((player) => player.name && player.email),
      };
      return registerTeam(data);
    },
    initialState,
  );

  const handleAddPlayer = useCallback(() => {
    if (players.length < 5) {
      setPlayers([
        ...players,
        { name: "", email: "", phoneNumber: "", position: "" },
      ]);
    }
  }, [players]);

  const handleRemovePlayer = useCallback(
    (index: number) => {
      if (players.length > 3) {
        setPlayers(players.filter((_, i) => i !== index));
      }
    },
    [players],
  );

  const handlePlayerChange = useCallback(
    (index: number, field: keyof Player, value: string) => {
      const newPlayers = [...players];
      newPlayers[index] = { ...newPlayers[index], [field]: value };
      setPlayers(newPlayers);
    },
    [players],
  );

  return (
    <Paper
      elevation={6}
      className="p-8 backdrop-blur-sm"
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(18, 18, 18, 0.8)"
            : "rgba(255, 255, 255, 0.9)",
        color: theme.palette.text.primary,
        borderRadius: "16px",
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)"
        }`,
        backdropFilter: "blur(10px)",
      }}
    >
      <form action={formAction}>
        <Box className="space-y-8">
          <TextField
            fullWidth
            name="teamName"
            label="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />

          <TournamentPlayersSection
            players={players}
            handlePlayerChange={handlePlayerChange}
            handleRemovePlayer={handleRemovePlayer}
            handleAddPlayer={handleAddPlayer}
          />

          {state.status !== "idle" && (
            <Alert
              severity={state.status}
              className="my-4"
              sx={{
                borderRadius: "12px",
              }}
            >
              {state.message}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isPending}
            sx={{
              borderRadius: "12px",
              height: "48px",
              background: theme.palette.primary.main,
              "&:hover": {
                background: theme.palette.primary.dark,
                transform: "translateY(-2px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isPending ? <CircularProgress /> : "Register Team"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TournamentRegistration;
