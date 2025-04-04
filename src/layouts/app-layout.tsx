import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./navigation";
import Footer from "./footer";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useEffect } from "react";

const AppLayout = () => {
  const { isAuthenticated,isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAuthenticated,isLoading', isAuthenticated,isLoading);
    
    if (!isAuthenticated && !isLoading) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate,isLoading]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow m-4">
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
