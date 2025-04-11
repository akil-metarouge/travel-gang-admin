import { useEffect } from "react";
import { useStatus } from "../utils/StatusContext";

const StatusToast = () => {
  const { status, setStatus } = useStatus();

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, setStatus]);

  if (!status) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded text-white transition-all ${
        status.type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {status.message}
    </div>
  );
};

export default StatusToast;
