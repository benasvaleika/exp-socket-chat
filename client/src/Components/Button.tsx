import React from "react";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className={
        "bg-blue-400 font-bold my-2 w-60 rounded-md h-8 text-indigo-50 mx-4"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
