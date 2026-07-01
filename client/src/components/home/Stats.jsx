import { motion } from "framer-motion";

const stats = [
  {
    value: "10K+",
    label: "Active Users",
  },
  {
    value: "1M+",
    label: "Files Stored",
  },
  {
    value: "99.99%",
    label: "Uptime",
  },
  {
    value: "150+",
    label: "Countries",
  },
];

function Stats() {
  return (
    <section className="bg-orange-500 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white">
            Trusted Worldwide
          </h2>

          <p className="mt-4 text-orange-100">
            Thousands of users trust AetherDrive every day.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 text-center md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
            >
              <h3 className="text-5xl font-bold text-white">
                {item.value}
              </h3>

              <p className="mt-3 text-orange-100">
                {item.label}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;