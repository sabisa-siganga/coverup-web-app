import Footer from "@/components/Footer/Footer";
import AdminNav from "@/components/AdminNav/AdminNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <AdminNav /> */}
      <ToastContainer />
      {children}
      {/* <Footer /> */}
    </>
  );
}
