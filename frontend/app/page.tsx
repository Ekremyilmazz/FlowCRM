"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => <p>Loading features...</p>,
});

const CallToAction = dynamic(() => import("@/components/CallToAction"), {
  loading: () => <p>Loading call to action...</p>,
});

const HomePage = () => {
  return (
    <main className="mt-20 space-y-6 mr-10">
      <motion.section
        className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">FlowCRM</h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
          Manage your customers and sales efficiently
        </p>

      </motion.section>
      <motion.div
        className="mb-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FeaturesSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CallToAction />
      </motion.div>
    </main>
  );
};

export default HomePage;
