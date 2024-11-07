"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

export default function Card({
  heading,
  price,
  duration,
  description,
  img,
  isAdmin,
  serviceID,
  isNavLinkActive,
}) {
  // console.log(img);
  const router = useRouter();

  const cardClickHandler = () => {
    if (isNavLinkActive) {
      // console.log(serviceID);
      router.push(`Admin/${serviceID}`);
    } else {
      return;
    }
  };

  return (
    <motion.div
      animate={{ opacity: [0, 1], x: [500, 0] }}
      className="card"
      onClick={cardClickHandler}
    >
      <div className="card__img">
        <Image
          className="card__img"
          src={img}
          alt={heading}
          // width={"1000"}
          // height={"25"}
          fill
          priority
        />
      </div>
      <div className="card__contentDiv">
        <h2 className={`card__heading`}>{heading}</h2>
        <p className="card__description">{description}</p>
        <div className="card__priceTimeDiv">
          <p className="card__priceTimeDiv__price">Price: {price} L.E</p>
          <p className="card__priceTimeDiv__duration">
            Duration: {duration} Minutes
          </p>
        </div>
        {!isAdmin && (
          <Link href={`/${serviceID}`}>
            <Button btnText={"Appoint"} btnType={"confirm"} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
