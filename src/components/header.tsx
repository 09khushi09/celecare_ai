import { FaRunning } from "react-icons/fa";
import { ModeToggle } from "./toogle";
import Link from "next/link";

const Header = () => {
  return (

    <div className="flex gap-3 py-15">

      <Link href={"/"} className="flex items-center gap-2 md:gap-3 text-foreground cursor-pointer text-3xl md:text-5xl font-secondary">
        CELECARE <span className="text-app-primary flex gap-2">
          Health
        </span>
      </Link>
      <ModeToggle />
    </div>

  );
};

export default Header;
