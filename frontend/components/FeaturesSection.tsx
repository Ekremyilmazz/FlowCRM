
import { Briefcase, Users, FileText } from "lucide-react";

const features = [
  {
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    title: "Sales Tracking",
    description: "Monitor your sales pipeline and close deals faster.",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Customer Management",
    description: "Manage contact details and customer history in one place.",
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "Activity Logs",
    description: "Track all system activities and user actions.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 px-6 bg-blue-100 rounded-xl">
      <div className="max-w-screen-4xl mx-auto text-center bg-blue-200 p-6 rounded-xl mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Why Choose FlowCRM?</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Powerful features to grow your business and simplify your workflow.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-4xl mx-auto ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border rounded-xl hover:shadow-md transition bg-blue-200"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
