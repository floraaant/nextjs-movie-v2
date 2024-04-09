import { ArrowPathIcon } from "@heroicons/react/16/solid";

export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <ArrowPathIcon className="h-12 w-12 animate-spin text-gray-500" />
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Loading...</h1>
          <p className="text-gray-500">Please wait a moment while we load the content.</p>
        </div>
      </div>
    )
  }