import { motion } from "framer-motion";
import Button from "../ui/Button";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-6xl font-extrabold leading-tight text-gray-900"
        >
          Store Smarter.
          <br />
          <span className="text-orange-500">
            Share Faster.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-8 max-w-2xl text-lg leading-8 text-slate-600"
        >
          AetherDrive is a secure cloud storage platform that
          helps developers, creators, and teams organize,
          collaborate, and access files from anywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-10 flex gap-4"
        >
          <Button to="/register">
            Get Started
          </Button>

          <button className="rounded-xl border border-gray-300 px-6 py-2.5 transition hover:border-orange-500 hover:text-orange-500">
            Live Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-14 text-gray-500"
        >
          ⭐⭐⭐⭐⭐ Trusted by developers worldwide
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;