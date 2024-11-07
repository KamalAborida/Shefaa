import { motion } from "framer-motion";

export default function InptDiv({
  label,
  inptType,
  placeholder,
  name,
  value,
  isError,
}) {

  // console.log(isError);

  return (
    <motion.div className="inptDiv" animate={{opacity: [0, 1], y: [40, 0]}}>
      <label
        className={`inptDiv__label ${isError ? "inptDiv__label-err" : ""}`}
      >
        {label}
      </label>
      {inptType !== "textarea" && (
        <input
          className={`inptDiv__inpt ${isError ? "inptDiv__inpt-err" : ""}`}
          type={inptType}
          placeholder={placeholder}
          name={name ? name : label}
          defaultValue={value ? value : ""}
        />
      )}
      {inptType === "textarea" && (
        <textarea
          className={`inptDiv__inpt ${isError ? "inptDiv__inpt-err" : ""}`}
          name={name ? name : label}
          defaultValue={value ? value : ""}
        />
      )}
    </motion.div>
  );
}
