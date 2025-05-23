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
      <TournamentRegistration />
    </div>
  );
}
