import Navbar from "@/components/shared/Navbar";

export default function AuthLayout({ children }) {
  return (
    <>
      <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
        <div className="w-full px-4 md:px-0 flex items-center justify-center">
          {children}
        </div>
        <div className="hidden md:block">
          <img 
            src="/bg.png" 
            alt="DevSynergy Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
