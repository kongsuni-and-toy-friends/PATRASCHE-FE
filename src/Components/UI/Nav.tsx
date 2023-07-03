import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <div className="h-[90px] flex justify-center items-center border-b-[1px] border-black">
      <Link to="/" className="font-semibold text-4xl">
        파트라슈
      </Link>
    </div>
  );
};

export default Nav;
