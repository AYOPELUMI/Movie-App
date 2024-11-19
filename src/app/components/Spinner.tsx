"use client";
import { motion } from 'framer-motion';

const FullScreenSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <motion.div
                className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            />
            {/* Optional: Add a loading text */}
            <motion.p
                className="mt-4 text-white text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                Loading...
            </motion.p>
        </div>
    );
};

export default FullScreenSpinner;
