export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Gym Management System</h1>
        <a href="/dashboard/admin" className="mt-4 text-blue-500 underline">
          Admin Dashboard
        </a>
        <a href="/dashboard/trainer" className="mt-4 text-blue-500 underline">
          Trainer Dashboard
        </a>
        <a href="/dashboard/trainee" className="mt-4 text-blue-500 underline">
          Trainee Dashboard
        </a>
      </div>
    );
  }
  