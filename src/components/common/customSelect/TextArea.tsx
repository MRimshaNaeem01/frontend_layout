"use client";
import React, { useState } from "react";

interface TextAreaGroupProps {
  label: string;
  isRequired?: boolean;
  htmlFor: string;
  onChange: (value: string) => void;
  value: string;
  cols?: number;
  rows?: number;
  resize?: boolean;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
}

const TextAreaGroup: React.FC<TextAreaGroupProps> = ({
  label,
  isRequired = false,
  htmlFor,
  onChange,
  value,
  cols,
  rows,
  resize = true,
  placeholder = "",
  maxLength,
  minLength

}) => {
  const [maxLengthError, setMaxLengthError] = useState(false);

  const handleMaxLength = (value: string) => {
    if (maxLength) {
      setMaxLengthError(value.length === maxLength);
    }
  };

  return (
    <div className="py-2 w-full flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className={`${maxLengthError ? "text-destructive" : "text-black"
          } text-xs sm:text-base`}
      >
        {label}{" "}
        {maxLength && (
          <span
            className={`${maxLengthError ? "text-destructive" : "text-muted"
              } text-xs italic`}
          >
            (Write {maxLength} Characters only)
          </span>
        )}
      </label>
      <textarea
        id={htmlFor}
        className={`${!resize ? "resize-none" : ""
          } w-full font_3 transition-all duration-300 ease-linear  text-lg p-2 border ${maxLengthError
            ? "border-destructive focus:border-destructive"
            : "border-[#9b9b9b] focus:border-black"
          } outline-none`}
        required={isRequired}
        value={value}
        onChange={(e) => {
          handleMaxLength(e.target.value);
          onChange(e.target.value);
        }}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
      />
    </div>
  );
};

export default TextAreaGroup;
