const Shimmer = ({ width, height, className = "" }: { width: string, height: string, className: string }) => (
    <div
        className={`relative overflow-hidden bg-gray-200 ${className}`}
        style={{ width, height }}
    >
        <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"
        />
        <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
);

export default function CardShimmer() {
    return (
        <div className="w-full mx-auto ">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <Shimmer
                        width="48px"
                        height="48px"
                        className="rounded-full"
                    />

                    <div className="flex-1 space-y-2">
                        {/* Title */}
                        <Shimmer
                            width="400px"
                            height="16px"
                            className="rounded"
                        />

                        {/* Subtitle */}
                        <Shimmer
                            width="260px"
                            height="14px"
                            className="rounded "
                        />

                        {/* Description */}
                        <Shimmer
                            width="160px"
                            height="14px"
                            className="rounded"
                        />

                    </div>

                    {/* Date/Number */}
                    <div className="text-right space-y-2">
                        <Shimmer
                            width="80px"
                            height="12px"
                            className="rounded"
                        />
                        <Shimmer
                            width="20px"
                            height="12px"
                            className="rounded ml-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}