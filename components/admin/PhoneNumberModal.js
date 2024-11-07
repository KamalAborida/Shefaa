"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessModal() {
  const searchParams = useSearchParams();
  const phoneModal = searchParams.get("phoneModal");
  const pathname = usePathname();

  return (
    <>
      {phoneModal && (
        <div className="backdrop">
          <div className="successModal">
            <p>Successfuly appointed</p>
            <Link href={pathname}>Close</Link>
          </div>
        </div>
      )}
    </>
  );
}
