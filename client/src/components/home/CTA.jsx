import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-orange-500 p-16 text-center shadow-2xl">

          <h2 className="text-4xl font-bold text-white">
            Ready to simplify your cloud storage?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-orange-100">
            Join AetherDrive today and experience fast, secure,
            and collaborative file management.
          </p>

          <Link
            to="/register"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-orange-600 transition hover:scale-105"
          >
            Get Started Free

            <ArrowRight size={20} />
          </Link>

        </div>
      </div>
    </section>
  );
}

export default CTA;