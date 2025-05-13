"use client";

import "../i18n/config";

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
import { useCallback, useEffect, useState } from "react";

import TournamentPlayersSection from "./TournamentPlayersSection";
import { registerTeam } from "@/actions/tournament";
import { useActionState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const playerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phoneNumber: z.string().min(5, { message: "Valid phone number is required" }),
  position: z.string().min(1, { message: "Position is required" }),
});

const formSchema = z.object({
  teamName: z.string().min(1, { message: "Team name is required" }),
  players: z
    .array(playerSchema)
    .min(3, { message: "At least 3 players are required" })
    .max(5, { message: "Maximum of 5 players allowed" }),
});

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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation();

  const [state, formAction, isPending] = useActionState(
    async (prevState: RegistrationState, formData: FormData) => {
      const data: RegistrationFormData = {
        teamName: formData.get("teamName") as string,
        players: players.filter((player) => player.name && player.email),
      };

      // Validate form data with Zod
      try {
        formSchema.parse(data);
        setFormErrors({});
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMap: Record<string, string> = {};
          error.errors.forEach((err) => {
            const path = err.path.join(".");
            errorMap[path] = err.message;
          });
          setFormErrors(errorMap);
          return {
            message: "Please fix the errors in the form",
            status: "error" as const,
          };
        }
      }

      try {
        return await registerTeam(data);
      } catch (error) {
        return {
          message: "Failed to register team. Please try again later.",
          status: "error" as const,
        };
      }
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

      // Clear field error when user is typing
      if (formErrors[`players.${index}.${field}`]) {
        const newErrors = { ...formErrors };
        delete newErrors[`players.${index}.${field}`];
        setFormErrors(newErrors);
      }
    },
    [players, formErrors],
  );

  const getFieldError = (field: string): string | undefined => {
    return formErrors[field];
  };

  const getPlayerFieldError = (
    index: number,
    field: keyof Player,
  ): string | undefined => {
    return formErrors[`players.${index}.${field}`];
  };

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
            label={t("Team Name")}
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
              if (formErrors.teamName) {
                const newErrors = { ...formErrors };
                delete newErrors.teamName;
                setFormErrors(newErrors);
              }
            }}
            required
            variant="outlined"
            error={!!formErrors.teamName}
            helperText={formErrors.teamName}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />

          {formErrors.players && (
            <Alert severity="error" className="mt-2">
              {formErrors.players}
            </Alert>
          )}

          <TournamentPlayersSection
            players={players}
            handlePlayerChange={handlePlayerChange}
            handleRemovePlayer={handleRemovePlayer}
            handleAddPlayer={handleAddPlayer}
            getPlayerFieldError={getPlayerFieldError}
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
            {isPending ? <CircularProgress /> : t("Register Team")}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TournamentRegistration;
