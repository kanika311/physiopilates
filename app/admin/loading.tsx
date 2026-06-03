export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

        <p className="mt-4 text-sm font-medium text-gray-600">
          Loading...
        </p>
      </div>
    </div>
  );
}