"use client";

import Error from "@/components/Error";

const AppError = (props: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <Error {...props} routeSegment="root" />;
};

export default AppError;
