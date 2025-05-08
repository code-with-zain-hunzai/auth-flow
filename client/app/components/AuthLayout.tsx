import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6 text-purple-700 font-bold">
          Auth
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
        {children}
        <div className="mt-4 text-center text-sm text-gray-600">
          <Link href="#" className="hover:underline">
            Need help?
          </Link>
        </div>
      </div>
    </div>
  );
}
