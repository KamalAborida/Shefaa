import Logo from "@/assets/Logo";
import AdminLoginForm from "@/components/form/AdminLoginFom";
import { motion } from "framer-motion";

export default function LoginPage() {
  // console.log("hi");
  return (
    <main className="loginPage">
      <div className="logoDiv">
        <Logo color="#596EA6" />
      </div>
      <AdminLoginForm />
    </main>
  );
}
