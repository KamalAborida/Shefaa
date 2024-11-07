import Recipt from "@/components/recipt/Recipt";

export default function ReciptPage({ params }) {
  // Fetch the product data with the param
  // The param should be the service ID
  // Recipt should take a heading and a price
  let price = 60; // fetched from database

  return (
    <main>
      <Recipt
        heading={"Cupping"}
        price={price}
        patient={{
          name: "Hoda",
          email: "H@H.com",
          phone: "45601230987",
          history:
            "My medical history includes a few conditions and past surgeries. I currently manage hypertension and arthritis, and I've had an appendectomy in the past. Fortunately, I don't have any allergies to worry about, but I do deal with chronic pain due to fibromyalgia. Additionally, my family has a history of diabetes and heart disease. I'm not on any medications at the moment, but my health journey emphasizes the importance of comprehensive care and ongoing management.",
          notes: "",
        }}
      />
    </main>
  );
}
