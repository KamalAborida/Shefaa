import Button from "@/components/general/Button";

export default function Recipt({ heading, price, patient }) {
  return (
    <div className="recipt">
      <h1 className="recipt__heading">{heading}</h1>
      <div className="recipt__infoDiv-personal">
        <p>{patient.name}</p>
        <p>{patient.email}</p>
        <p>{patient.phone}</p>
      </div>
      <hr></hr>
      <div className="recipt__infoDiv-history">
        <h2 className="recipt__infoDiv-history__heading">Medical History</h2>
        <p>{patient.history}</p>
      </div>
      <hr></hr>
      <div className="recipt__infoDiv-notes">
        <h2 className="recipt__infoDiv-notes__heading">Notes</h2>
        <p>{patient.notes}</p>
      </div>
      <hr></hr>
      <h3 className="recipt__price">Price: {price} L.E</h3>
      <p className="recipt__tip">
        After pressing confirm, We shall contact you via phone number, That
        might take several hours to reach you.
      </p>
      <Button btnText={"Confirm"} btnType={"confirm"} />
      <Button btnText={"Cancel"} btnType={"cancel"} />
    </div>
  );
}
