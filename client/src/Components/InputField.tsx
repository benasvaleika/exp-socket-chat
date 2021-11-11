import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  getText: (text: string) => void;
  value: string;
}

const InputField: ForwardRefRenderFunction<HTMLInputElement, InputFieldProps> =
  ({ value, getText, placeholder }) => {
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      getText(e.target.value);
    };

    return (
      <input
        className={"mx-4 my-4 border-b-2 text-gray-100 h-8 bg-gray-700"}
        placeholder={placeholder}
        value={value}
        type="text"
        onChange={(e) => changeHandler(e)}
      ></input>
    );
  };

export default InputField;
