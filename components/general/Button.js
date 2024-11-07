"use client";

import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

export default function Button({ btnText, btnType, onClick, type, disabled }) {
  const status = useFormStatus();

  return (
    <motion.button
      onClick={onClick}
      type={type}
      animate={{ opacity: [0, 1], y: [40, 0] }}
      className={`btn btn-${btnType}`}
      disabled={status.pending || disabled}
    >
      {btnText}
    </motion.button>
  );
}
