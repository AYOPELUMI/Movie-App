'use client';


import { motion } from 'framer-motion';

const MovieCardSkeleton = () => {
    return (
        <motion.div
            className=" rounded shadow-lg cursor-pointer animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        >
            {/* Skeleton Image */}
            <div className="relative bg-gray-300 rounded-t-lg w-full h-72"></div>

            {/* Skeleton Text */}
            <div className="mt-2 p-2">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className='flex gap-2'>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCardSkeleton;
