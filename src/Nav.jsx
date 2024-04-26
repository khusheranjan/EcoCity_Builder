import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header className="header">
      <div className="flex">
        <img
          src="https://www.pngitem.com/pimgs/m/216-2165086_transparent-planning-icon-png-urban-design-planning-icon.png"
          alt="EcoCity Builder"
          className="logo w-10 h-10"
          />
          <Link to="/">
        <h1 className="px-4 text-2xl pt-1 font-semibold">EcoCity Builder</h1>
        </Link>
      </div>
      <nav className="pr-6">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Nav;
