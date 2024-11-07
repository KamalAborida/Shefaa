"use client"

import Logo from "@/assets/Logo";
import hamburger from "../../assets/icon-hamburger.svg"
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <motion.nav animate={{y: [-100, 0]}} className="navbar">
      <Logo color="#596EA6"/>
      <Link href={"?navModal=true"}><Image src={hamburger} alt="ham" /></Link>
    </motion.nav>
  );
}
