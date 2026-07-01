import { Link } from "react-router-dom";

function Button({ to, children }) {
  return (
    <Link
      to={to}
      className="rounded-xl bg-orange-500 px-5 py-2.5 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
    >
      {children}
    </Link>
  );
}

export default Button;