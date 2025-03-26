import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { SignupData } from "../types/sign-up";
import { useMutation } from "@tanstack/react-query";
import { AuthContextType } from "../types/auth-context-type";
import { User } from "../types/user";
import { getUser } from "../services/get-user";
import {loginUser} from  '../services/login-user'
import { signUpUser } from "../services/sign-up-user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const { data } = await getUser();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (location.pathname !== "/login") {
      checkAuth();
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      setIsLoading(true);
      const { data } = await loginUser(credentials);
      localStorage.setItem("authToken", data.token);
      return data.user;
    },
    onSuccess: (user) => {
      setUser(user);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const signupMutation = useMutation({
    mutationFn: async (userData: SignupData) => {
      setIsLoading(true);
      const { data } = await signUpUser(userData);
      localStorage.setItem("authToken", data.token);
      return data.user;
    },
    onSuccess: (user) => {
      setUser(user);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const signup = async (userData: SignupData) => {
    await signupMutation.mutateAsync(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isLoading: isLoading || loginMutation.isPending || signupMutation.isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
