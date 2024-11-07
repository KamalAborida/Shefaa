"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function NavModal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("navModal");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (modal) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [modal]);

  return (
    <>
      <AnimatePresence>
        {modal && (
          <>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.1 }}
              exit={{ opacity: [1, 0] }}
              className="backdrop"
              onClick={() => {
                router.push(pathname);
              }}
            ></motion.div>

            <motion.div
              className="navModal"
              animate={{ x: [1000, 0] }}
              transition={{ type: "keyframes" }}
              exit={{ x: [0, 1000] }}
            >
              <ul className="navModal__list">
                {/* <Link href={pathname}>
    <li className="navModal__list__li">Home</li>
  </Link> */}
                <Link href={"/Login"}>
                  <li className="navModal__list__li">Login</li>
                </Link>
                <Link href={"?Arabic=true"}>
                  <li className="navModal__list__li">العربيه</li>
                </Link>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
