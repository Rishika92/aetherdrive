import { Link } from "react-router-dom";
import Container from "../common/Container";
import Logo from "../common/Logo";
import Button from "../ui/Button";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden gap-8 md:flex">
            <Link to="/">Home</Link>
            <Link to="/">Features</Link>
            <Link to="/">Pricing</Link>
            <Link to="/">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">Login</Link>

            <Button to="/register">
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;