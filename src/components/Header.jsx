import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Job Follow-Up</h2>

      <nav>
        <NavLink to={"/"}>Job Lists</NavLink>
        <NavLink to={"/new"}>Add Job</NavLink>
      </nav>
    </header>
  );
};

export default Header;
