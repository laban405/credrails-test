import { Outlet } from 'react-router-dom';
import Footer from './footer';
import { ToggleTheme } from '@/components/toggle-theme';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className='flex justify-end m-8'>
         
          <div>
          <ToggleTheme />
          </div>
        </div>
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;