
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Credrails CSV Manager</h3>
              <p className="text-gray-400">Upload and manage your files with ease</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Credrails CSV Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;