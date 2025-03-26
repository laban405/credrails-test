import { ToggleTheme } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/contexts/auth-context';
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
  const { user, logout, isAuthenticated,isLoading } = useAuth();

  const linkStyles = ({ isActive }) =>
    isActive
      ? 'text-primary font-semibold'
      : 'hover:text-primary transition-colors duration-200';

  if(isLoading) return <div className="text-center py-4">Loading...</div>

  return (
    <nav className="shadow-lg border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="text-xl font-bold">
              CSV App
            </NavLink>
            {isAuthenticated && (
              <div className="md:flex space-x-6">
                <NavLink to="/upload" className={linkStyles}>
                  Upload
                </NavLink>
                <NavLink to="/details" className={linkStyles}>
                  Details
                </NavLink>
             
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:inline">{user?.firstName}</span>
                <Button
                  onClick={logout}
                  className="bpx-4 py-2 rounded transition duration-200"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded transition duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/sign-up" 
                  className="px-4 py-2 rounded transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
              <ToggleTheme />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;