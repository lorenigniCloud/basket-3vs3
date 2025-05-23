"use client";

import Error from "@/components/Error";

const TournamentError = (props: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <Error {...props} routeSegment="tournament" />;
};

export default TournamentError;
