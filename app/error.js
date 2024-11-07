"use client";

import Logo from "@/assets/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

const ErrorPage = ({ statusCode }) => {
  const router = useRouter();

  return (
    <div>
      <Logo color={"red"}/>
      <h1 className="error">{statusCode}</h1>
      <p className="error">
        {statusCode === 404
          ? "Sorry, the page you are looking for does not exist."
          : "An unexpected error has occurred."}
      </p>
      <Link href="/Admin" passHref>
        <button>Go to Home</button>
      </Link>
    </div>
  );
};
