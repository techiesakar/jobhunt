import dynamic from "next/dynamic";
const Toolbar = dynamic(() => import("@/components/ui/toolbar/Toolbar"));
import "./globals.css";
import Footer from "@/components/ui/footer/Footer";
import LoginStatusProvider from "@/hoc/context/LoginStatusContextProvicer";
import { cookies } from "next/headers";

export const metadata = {
  title: "Jobhunt",
  description:
    "Find your dream job with our comprehensive job hunt website. Browse thousands of job listings, connect with employers, and enhance your career with our resources and tools. Start your job search today!",
};

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <LoginStatusProvider>
      <html lang="en">
        <body className="overflow-x-hidden font-poppins">
          <Toolbar />
          <main className="bg-white">{children}</main>
          <Footer />
        </body>
      </html>
    </LoginStatusProvider>
  );
};

export default layout;
