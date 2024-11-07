"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessModal() {
  const searchParams = useSearchParams();
  const successModal = searchParams.get("successModal");
  const pathname = usePathname();

  return (
    <>
      {successModal && (
        <div className="backdrop">
          <div className="successModal">
            <p className="successModal__p-title">
              Successfuly appointed
            </p>
            <p className="successModal__p-note">
              please wait for us to call you, This may
              take several hours to a day at most
            </p>
            <Link className="successModal__link" href={pathname}>
              Close
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
