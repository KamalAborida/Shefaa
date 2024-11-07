"use client";

import { useRouter } from "next/navigation";
import CardsDiv from "../cardsDiv/CardsDiv";
import Button from "../general/Button";
import { useEffect, useState } from "react";

export default function AdminCardsDiv({ sectionTitle, data }) {
  const router = useRouter();
  // const [serviceList, setServiceList] = useState([])

  // useEffect(() => {
  //   console.log("Effect");
  //   if (data) {
  //     console.log("data found == Effect");
  //     setServiceList(data)
  //   }
  // }, [data, serviceList])

  const btnHandler = () => {
    router.push("Admin/AddService");
  };

  return (
    <div className="adminCardsDiv">
      <CardsDiv isAdmin={true} sectionTitle={sectionTitle} data={data} isNavLinkActive={true}/>
      <Button btnText={"Add +"} btnType={"confirm"} onClick={btnHandler} />
    </div>
  );
}
