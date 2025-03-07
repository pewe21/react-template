import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, errMessage } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate(); // ✅ Pindahkan ke atas agar selalu dipanggil

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
      if (errMessage) {
        toast.error(errMessage);
      }
    }
  }, [token, navigate]);

  if (token) {
    return children;
  }

  return null;
}
