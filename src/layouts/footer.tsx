const Footer = () => {
  return (
    <footer className=" py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Credrails CSV App</h3>
            <p className="">Upload and manage your files with ease</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t  text-center  text-sm">
          <p>
            © {new Date().getFullYear()} Credrails CSV App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
