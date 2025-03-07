import { loginAction } from "@/app/actions/authAction";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { RootState } from "@/app/store";
import PasswordInput from "@/components/custom/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token, loading } = useAppSelector((state: RootState) => state.auth);

  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, token]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginAction(formLogin)).then((res) => {
      if (res.payload?.token) {
        navigate("/dashboard");
      } else {
        toast.error(res.payload);
      }
    });
  }

  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign In For The Access.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  placeholder="Enter your Username"
                  onChange={(e) =>
                    // (formLogin.current.username = e.target.value)
                    setFormLogin((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                {/* <Input
                  id="password"
                  placeholder="**************"
                  onChange={(e) =>
                    // (formLogin.current.password = e.target.value)
                    setFormLogin({ ...formLogin, password: e.target.value })
                  }
                /> */}

                <PasswordInput
                  id="password"
                  placeholder="Enter your password"
                  value={formLogin.password}
                  onChange={(e) =>
                    setFormLogin((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  loading...
                </>
              ) : (
                <>
                  <LogIn className="w-6 h-6" />
                  Login
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
