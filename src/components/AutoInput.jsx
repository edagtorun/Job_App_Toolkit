import React from "react";
import { useSelector } from "react-redux";

const AutoInput = ({ label, name }) => {
  const { jobs } = useSelector((store) => store);

  // 1. Sadece pozisyin degerlerinden olusan bir dizi tanimla
  const arr = jobs.map((job) => job[name]);

  // 2. dizide tekrar eden elemalari kaldir
  const filtredSet = new Set(arr);

  // 3. Set'in dondurdugu nesneyi diziye cevirmemiz gerekiyor.
  const options = Array.from(filtredSet);

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input list={name} name={name} id={label} type="text" required />

      <datalist id={name}>
        {options.map((i) => (
          <option value={i} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
