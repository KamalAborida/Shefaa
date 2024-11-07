"use server"

import { S3 } from "@aws-sdk/client-s3";
import { deleteService } from "./services";
import { redirect } from "next/navigation";

export async function deleteServiceAction(serviceId, img) {
  const s3 = new S3({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: "shefaa-demo",
    Key: img, // The key (name) of the object you want to delete
  };

  s3.deleteObject(params, async (err) => {
    if (err) {
      // console.error('Error deleting object', err);
      return { success: false };
    }
  });

  try {
    const result = await deleteService(serviceId);
    // console.log(result);
  } catch (error) {
    // console.log(error);
    throw new Error(error.message)
    // return { success: false, error: error.message };
  }

  redirect("/Admin");
}