import { Star, StarOff } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating); // Count of full stars
    const totalStars = 5; // Total number of stars

    return (
        <div className="flex">
            {/* Render stars */}
            {Array.from({ length: totalStars }).map((_, index) => {
                if (index < fullStars) {
                    // Full stars
                    return (
                        <Star
                            key={`full-${index}`}
                            height={12}
                            width={12}
                            className="text-yellow-500"
                            fill="currentColor"
                        />
                    );
                }
                // Empty stars
                return (
                    <StarOff
                        key={`empty-${index}`}
                        height={12}
                        width={12}
                        className="text-gray-400"
                    />
                );
            })}
        </div>
    );
};