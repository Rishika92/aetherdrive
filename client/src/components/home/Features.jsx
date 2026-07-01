import {
  Cloud,
  FolderKanban,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Upload and access files instantly with an optimized storage pipeline.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Sharing",
    description:
      "Share files securely with role-based permissions and protected links.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description:
      "Access your files anytime across devices with seamless synchronization.",
  },
  {
    icon: FolderKanban,
    title: "Smart Organization",
    description:
      "Organize documents with folders, tags, and powerful search.",
  },
];

function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything you need to manage files
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            AetherDrive provides all the tools required to
            securely store, organize and collaborate on files.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex rounded-xl bg-orange-100 p-4">
                  <Icon
                    className="text-orange-500"
                    size={32}
                  />
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;