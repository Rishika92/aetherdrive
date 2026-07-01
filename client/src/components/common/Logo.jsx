import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="text-2xl font-bold">
      <span className="text-gray-900">Aether</span>
      <span className="text-orange-500">Drive</span>
    </Link>
  );
}

export default Logo;