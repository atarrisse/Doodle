import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  ...props
}) => {
  return (
    <button className="px-5 rounded font-bold text-white h-[3rem] bg-(--color-red) disabled:bg-(--color-disabled) cursor-pointer transition-colors" {...props} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
