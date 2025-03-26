import { useAuth } from '@/features/auth/contexts/auth-context';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const { user, logout, isAuthenticated,isLoading } = useAuth();

  if(isLoading) return <>Loading...</>

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold hover:text-gray-300">
              MyApp
            </Link>
            {isAuthenticated && (
              <div className="hidden md:flex space-x-6">
                <Link to="/upload" className="hover:text-gray-300">
                  Upload
                </Link>
                <Link to="/details" className="hover:text-gray-300">
                  Details
                </Link>
             
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:inline">Welcome, {user?.firstName}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/sign-up" 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;