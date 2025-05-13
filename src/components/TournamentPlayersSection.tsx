"use client";

import { Box, Button, IconButton, MenuItem, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Player } from "@/actions/tournament";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const POSITIONS = ["Guard", "Forward", "Center"]; // Add the appropriate positions

interface TournamentPlayersSectionProps {
  players: Player[];
  handlePlayerChange: (
    index: number,
    field: keyof Player,
    value: string,
  ) => void;
  handleRemovePlayer: (index: number) => void;
  handleAddPlayer: () => void;
  getPlayerFieldError?: (
    index: number,
    field: keyof Player,
  ) => string | undefined;
}

const TournamentPlayersSection = (props: TournamentPlayersSectionProps) => {
  const {
    players,
    handlePlayerChange,
    handleRemovePlayer,
    handleAddPlayer,
    getPlayerFieldError,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      {players.map((player, index) => (
        <Box
          key={index}
          className="space-y-4 p-6 relative"
          sx={{
            borderRadius: "12px",
            background: "rgba(0,0,0,0.02)",
            backdropFilter: "blur(5px)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 16px rgba(50, 214, 32, 0.4)"
                  : "0 8px 16px rgba(0,0,0,0.1)",
            },
          }}
        >
          <div className="grid grid-cols-2 gap-6">
            <TextField
              name={`player${index}Name`}
              label={t("Name")}
              value={player.name}
              onChange={(e) =>
                handlePlayerChange(index, "name", e.target.value)
              }
              required
              variant="outlined"
              error={!!getPlayerFieldError?.(index, "name")}
              helperText={getPlayerFieldError?.(index, "name")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              name={`player${index}Email`}
              label={t("Email")}
              type="email"
              value={player.email}
              onChange={(e) =>
                handlePlayerChange(index, "email", e.target.value)
              }
              required
              variant="outlined"
              error={!!getPlayerFieldError?.(index, "email")}
              helperText={getPlayerFieldError?.(index, "email")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              name={`player${index}Phone`}
              label={t("Phone Number")}
              value={player.phoneNumber}
              onChange={(e) =>
                handlePlayerChange(index, "phoneNumber", e.target.value)
              }
              required
              variant="outlined"
              error={!!getPlayerFieldError?.(index, "phoneNumber")}
              helperText={getPlayerFieldError?.(index, "phoneNumber")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              name={`player${index}Position`}
              select
              label={t("Position")}
              value={player.position}
              onChange={(e) =>
                handlePlayerChange(index, "position", e.target.value)
              }
              required
              variant="outlined"
              error={!!getPlayerFieldError?.(index, "position")}
              helperText={getPlayerFieldError?.(index, "position")}
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
          {t("Add Player")}
        </Button>
      )}
    </>
  );
};

export default TournamentPlayersSection;
