import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  routeSegment: string;
}

const Error = (props: ErrorProps) => {
  const { error, reset, routeSegment } = props;
  const { t } = useTranslation();

  useEffect(() => {
    console.error("Error in segment:", routeSegment, error);
  }, [error, routeSegment]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">{t("Something went wrong!")}</h2>
      <button
        className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors"
        onClick={() => reset()}
      >
        {t("Try again")}
      </button>
    </div>
  );
};

export default Error;
