"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
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

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { registerTeam } from "@/actions/tournament";
import { useActionState } from "react";
import { useColorMode } from "@/theme/ThemeContext";

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

          {players.map((player, index) => (
            <Box
              key={index}
              className="space-y-4 p-6 relative"
              sx={{
                borderRadius: "12px",
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.02)",
                backdropFilter: "blur(5px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 8px 16px rgba(0,0,0,0.4)"
                      : "0 8px 16px rgba(0,0,0,0.1)",
                },
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                <TextField
                  name={`player${index}Name`}
                  label="Name"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerChange(index, "name", e.target.value)
                  }
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  name={`player${index}Email`}
                  label="Email"
                  type="email"
                  value={player.email}
                  onChange={(e) =>
                    handlePlayerChange(index, "email", e.target.value)
                  }
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  name={`player${index}Phone`}
                  label="Phone Number"
                  value={player.phoneNumber}
                  onChange={(e) =>
                    handlePlayerChange(index, "phoneNumber", e.target.value)
                  }
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  name={`player${index}Position`}
                  select
                  label="Position"
                  value={player.position}
                  onChange={(e) =>
                    handlePlayerChange(index, "position", e.target.value)
                  }
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                >
                  {POSITIONS.map((pos) => (
                    <MenuItem key={pos} value={pos}>
                      {pos}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {players.length > 3 && (
                <IconButton
                  className="absolute -top-2 -right-2"
                  onClick={() => handleRemovePlayer(index)}
                  color="error"
                  sx={{
                    background: theme.palette.error.main,
                    color: "#fff",
                    "&:hover": {
                      background: theme.palette.error.dark,
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          {players.length < 5 && (
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddPlayer}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "12px",
                height: "48px",
                borderWidth: "2px",
                "&:hover": {
                  borderWidth: "2px",
                },
              }}
            >
              Add Player
            </Button>
          )}

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
