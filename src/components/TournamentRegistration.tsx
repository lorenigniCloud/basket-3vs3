"use client";

import {
  Alert,
  Box,
  Button,
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
  const { toggleColorMode } = useColorMode();
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
      elevation={3}
      className="p-8"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <form action={formAction}>
        <Box className="space-y-6">
          <TextField
            fullWidth
            name="teamName"
            label="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />

          {players.map((player, index) => (
            <Box
              key={index}
              className="space-y-4 p-4 border rounded-lg relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name={`player${index}Name`}
                  label="Name"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerChange(index, "name", e.target.value)
                  }
                  required
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
                />
                <TextField
                  name={`player${index}Phone`}
                  label="Phone Number"
                  value={player.phoneNumber}
                  onChange={(e) =>
                    handlePlayerChange(index, "phoneNumber", e.target.value)
                  }
                  required
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
                  className="absolute top-2 right-2"
                  onClick={() => handleRemovePlayer(index)}
                  color="error"
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
            >
              Add Player
            </Button>
          )}

          {state.status !== "idle" && (
            <Alert severity={state.status} className="my-4">
              {state.message}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isPending}
          >
            {isPending ? "Registering..." : "Register Team"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TournamentRegistration;
