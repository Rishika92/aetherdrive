import { Link } from "react-router-dom";
import Container from "../common/Container";

function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-12">
      <Container>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          <div>

            <h2 className="text-2xl font-bold">
              <span className="text-gray-900">Aether</span>
              <span className="text-orange-500">Drive</span>
            </h2>

            <p className="mt-2 text-slate-500">
              Secure cloud storage for modern teams.
            </p>

          </div>

          <div className="flex gap-8 text-slate-600">

            <Link to="/">Home</Link>

            <Link to="/">Features</Link>

            <Link to="/">Pricing</Link>

            <Link to="/">Contact</Link>

          </div>

        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} AetherDrive. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}

export default Footer;