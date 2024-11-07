"use client";

import { motion } from "framer-motion";

export default function Video() {
  return (
    <motion.video animate={{opacity: [0, 0.2, 1], y: [100, 0]}} className="video" height="360px" autoPlay controls>
      <source
        src="https://shefaa-demo.s3.amazonaws.com/vid.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </motion.video>
  );
}
