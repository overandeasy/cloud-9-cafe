import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] max-h-full">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle className="w-10 h-10 animate-spin text-cafe-theme" />
        <div className="text-lg font-medium text-gray-700">
          Getting coffees ☕️ <span className="animate-pulse">...</span>
        </div>
      </div>
    </div>
  );
}
