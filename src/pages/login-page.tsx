import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/features/auth/contexts/auth-context";
import {
  loginSchema,
  LoginFormData,
} from "@/features/auth/types/login-form-data";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { login, isLoading } = useAuth();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6">
            Sign in to your account
          </h1>

          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6 p-6 border rounded-md">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-2 px-4 rounded-lg bg-primary"
                >
                  {isLoading ? "Logging in.." : "Log in"}
                </Button>

                <div className="mb-2 text-sm text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="mr-2 text-primary hover:text-primary-dark"
                  >
                    <div className="ml-2 relative inline-block group">
                      <span className="text-primary hover:text-primary-dark">
                        Sign up
                      </span>
                      <span className="absolute left-1/2 bottom-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </div>
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
