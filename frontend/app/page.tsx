import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the Gym Management System
      </h1>
      <div className="flex gap-5 justify-center items-center">
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
