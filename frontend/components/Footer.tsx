"use client";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="border-t bg-blue-200 py-6 text-sm shadow-inner mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto flex flex-col justify-between items-center sm:flex-row gap-4 px-6">
        <span className="text-gray-900 dark:text-gray-400">@ 2025 FlowCRM</span>

        <div className="flex flex-wrrap items-center gap-4">
          <a
            href="/privacy"
            className="hover:underline text-gray-900 dark:text-gray-300"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="hover:underline text-gray-900 dark:text-gray-300"
          >
            Terms
          </a>
          <a
            href="/contact"
            className="hover:underline text-gray-900 dark:text-gray-300"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
