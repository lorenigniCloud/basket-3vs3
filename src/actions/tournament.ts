"use server";

export interface Player {
  name: string;
  email: string;
  phoneNumber: string;
  position: string;
}

export interface RegistrationFormData {
  teamName: string;
  players: Player[];
}

export type RegistrationState = {
  message: string;
  status: "success" | "error" | "idle";
};

export async function registerTeam(
  data: RegistrationFormData,
): Promise<RegistrationState> {
  try {
    // Validate team size
    if (data.players.length < 3 || data.players.length > 5) {
      return {
        message: "Team must have between 3 and 5 players",
        status: "error",
      };
    }

    // Here you would typically save to your database
    // For now, we'll just simulate a successful registration
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      message: "Team registered successfully!",
      status: "success",
    };
  } catch (error) {
    return {
      message: "Failed to register team",
      status: "error",
    };
  }
}
