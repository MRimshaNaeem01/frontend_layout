import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Styles from './inpufield.module.css'
const CustomPhoneNumber = ({ field, error, errorMessage }: any) => {
  return (
    <>
      <PhoneInput
        {...field}
        value={field.value}
        onChange={(value) => field.onChange(value)}
        placeholder="Enter phone number*"
        autoComplete="on"
        defaultCountry="PK"
        international
        countryCallingCodeEditable={false}
        className={`w-full bg-white leading-3 p-3.5 ${Styles.PhoneInputRimsha} rounded-md border ${error ? "border-destructive" : "border-indigo-600"}`}
      />
      {error && errorMessage && <p className="text-destructive text-xs text-start mt-1 mb-3">{errorMessage}</p>}
    </>
  );
};

export default CustomPhoneNumber;
