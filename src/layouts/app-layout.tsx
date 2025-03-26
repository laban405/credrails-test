import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./navigation";
import Footer from "./footer";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useEffect } from "react";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
