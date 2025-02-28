export default function Loading() {
    return (
      <div className="flex h-screen items-center justify-center bg-main bg-opacity-50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-p-basico w-12 h-12"></div>
          <p className="text-lg text-white animate-pulse">Por favor, espere...</p>
        </div>
      </div>
    );
  };