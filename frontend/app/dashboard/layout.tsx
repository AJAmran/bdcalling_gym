import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Sidebar />
      <Header />
      {children}
    </div>
  );
}
