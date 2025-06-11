import { ModeToggle } from "@/components/toogle";
import { ReactNode } from "react";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <Navbar>
        {children}
      </Navbar>
    );
  }
  
  const Navbar = ({children} : {children : ReactNode}) => {
    return (
        <div className="min-h-screen w-full flex flex-col">
      <nav className="w-full flex items-center p-3 justify-center gap-3">
        <h1 className="flex font-semibold text-3xl">
          CELECARE <span className="text-app-primary">Health</span>
        </h1>
        <ModeToggle />
      </nav>
      <main className="flex-grow flex items-center justify-center mx-auto max-w-7xl sm:px-6 min-h-[90vh]">
        {children}
      </main>
    </div>
    )
  }