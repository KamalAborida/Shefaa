"use client";

import Image from "next/image";
import twitterIcon from "../../assets/icon-twitter.svg";
import addIcon from "../../assets/icon-add.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import InptDiv from "../general/InptDiv";
import { addSocialMediaAction } from "@/lib/addActions";
import { useFormState } from "react-dom";
import Button from "../general/Button";
import { useRouter } from "next/navigation";
import { getSocialMediaIcon } from "@/utilities/utility";
import { deleteSocialMedia } from "@/lib/services";

export default function SocialMediaDiv({ data }) {
  const [showSocialMediaForm, setShowSocialMediaForm] = useState(false);
  const [isNewSocialMedia, setIsNewSocialMedia] = useState(false);
  const [socialMediaName, setSocialMediaName] = useState("");
  const [state, formAction] = useFormState(addSocialMediaAction, {});
  // const router = useRouter();

  useEffect(() => {
    if (state) {
      if (state.success) {
        setShowSocialMediaForm(false);
      }
    }
  }, [state]);

  const showFormHandler = () => {
    setShowSocialMediaForm((prev) => !prev);
  }

  const deleteHandler = async () => {
    await deleteSocialMedia(socialMediaName)
    setShowSocialMediaForm(false)
  }

  return (
    <section className="socialMediaDiv">
      <h1 className="socialMediaDiv__title">Social Media</h1>
      <div className="socialMediaDiv__socialMediaIcons">
        {data &&
          data.map((element) => {
            return (
              <Image
                key={element.name}
                src={getSocialMediaIcon(element.name)}
                alt="twitter"
                onClick={() => {
                  setSocialMediaName(element.name);
                  setIsNewSocialMedia(false);
                  showFormHandler();
                }}
              />
            );
          })}
        <Image
          src={addIcon}
          alt="add"
          onClick={() => {
            setIsNewSocialMedia(true);
            showFormHandler();
          }}
        />
      </div>
      {showSocialMediaForm && (
        <form className="socialMediaDiv__form" action={formAction}>
          <input hidden readOnly value={isNewSocialMedia} name="isNewObject" />
          {!isNewSocialMedia && (
            <input hidden readOnly value={socialMediaName} name="name" />
          )}
          {isNewSocialMedia && (
            <InptDiv
              placeholder={
                state && state.errors && state.errors.includes("Name")
                  ? "Please provide a Name"
                  : "Name"
              }
              name="name"
              isError={
                state && state.errors && state.errors.includes("Name")
                  ? true
                  : false
              }
            />
          )}
          <InptDiv
            placeholder={
              state && state.errors && state.errors.includes("Link")
                ? "Please provide a Link"
                : "Link"
            }
            name="link"
            isError={
              state && state.errors && state.errors.includes("Link")
                ? true
                : false
            }
          />
          <Button type={"submit"} btnType={"confirm"} btnText={"Add +"} />
          {!isNewSocialMedia && (
            <Button btnType={"delete"} btnText={"Delete"} onClick={deleteHandler}/>
          )}
        </form>
      )}
    </section>
  );
}
