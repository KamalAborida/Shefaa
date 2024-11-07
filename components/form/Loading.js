"use client";

import Logo from "@/assets/Logo";
import { useEffect } from "react";
// import { useEffect } from "react";
import { useFormStatus } from "react-dom";

import { motion } from "framer-motion";

export default function Loading({}) {
  const status = useFormStatus();

  useEffect(() => {
    if (status.pending) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [status.pending]);

  // useEffect(() => {
  // }, [status]);

  if (status.pending) {
    return (
      <>
        <motion.div
          className="backdrop"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.1 }}
          exit={{ opacity: [1, 0] }}
        ></motion.div>
        <motion.div
          className="loadingForm"
          animate={{ opacity: [0, 1], y: [1000, 0] }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: [1, 0], y: [0, 1000] }}
        >
          <Logo color={"#FFFFFF"} />
          <p>Sending your data...</p>
        </motion.div>
      </>
    );
  }

  // return (
  //   <>
  //     <motion.div
  //       className="backdrop"
  //       animate={{ opacity: [0, 1] }}
  //       transition={{ duration: 0.1 }}
  //       exit={{ opacity: [1, 0] }}
  //     ></motion.div>
  //     <motion.div
  //       className="loadingForm"
  //       animate={{ opacity: [0, 1], y: [1000, 0] }}
  //       transition={{ duration: 0.3 }}
  //       exit={{ opacity: [1, 0], y: [0, 1000] }}
  //     >
  //       <Logo color={"#FFFFFF"} />
  //       <p>Sending your data...</p>
  //     </motion.div>
  //   </>
  // );

  return null;
}
