import {
  CheckCircle2,
  Rocket,
  Users,
} from "lucide-react";

const reasons = [
  {
    icon: CheckCircle2,
    title: "Secure by Design",
    description:
      "Enterprise-grade security with encrypted storage and protected file sharing.",
  },
  {
    icon: Rocket,
    title: "Blazing Fast",
    description:
      "Optimized uploads and downloads ensure lightning-fast performance.",
  },
  {
    icon: Users,
    title: "Built for Collaboration",
    description:
      "Share folders, manage permissions, and work together seamlessly.",
  },
];

function WhyChoose() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">

        {/* Left */}

        <div>

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            WHY AETHERDRIVE
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Built for the way modern teams work.
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Whether you're a developer, designer, student, or business,
            AetherDrive makes storing and sharing files effortless.
          </p>

          <div className="mt-10 space-y-8">

            {reasons.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-5"
                >
                  <div className="rounded-xl bg-orange-100 p-3">
                    <Icon
                      className="text-orange-500"
                      size={26}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <div className="flex h-[420px] w-full max-w-md items-center justify-center rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 shadow-xl">

            <span className="text-8xl">
              ☁️
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;