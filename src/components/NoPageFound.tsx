export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-6">Page not found 😢</p>
      <button
        onClick={() => window.location.replace("/")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
}
