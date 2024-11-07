export default function RadioButtonDiv({}) {
  return (
    <div className="appointmentForm__radioBtnsDiv">
    <label className="appointmentForm__radioBtnsDiv__label">
      <input  type="radio" value="male" name="Gender" className="appointmentForm__radioBtnsDiv__inpt"/>
      Male
    </label>
    <label className="appointmentForm__radioBtnsDiv__label">
      <input type="radio" value="female" name="Gender" className="appointmentForm__radioBtnsDiv__inpt"/>
      Female
    </label>
  </div>
  );
}
