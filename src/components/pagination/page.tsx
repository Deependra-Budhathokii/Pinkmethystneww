// components/Pagination.tsx

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
    return (
        <div className="flex items-center justify-center space-x-2 mt-10 font-playfairdisplay">
            {/* Previous */}
            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition">
                <ChevronLeft className="w-4 h-4" />
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 rounded-md bg-[#8E5EA2] text-white font-medium shadow-md">
                    1
                </button>
                <button className="px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition">
                    2
                </button>
                <span className="text-gray-500">...</span>
                <button className="px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition">
                    50
                </button>
            </div>

            {/* Next */}
            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition">
                Next
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;
