"use server";

import { redirect } from "next/navigation";

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
    // Here you would typically save to your database
    // For now, we'll just simulate a successful registration
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to the home page after successful registration
    redirect("/");

    // This won't be reached due to the redirect, but needed for TypeScript
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
