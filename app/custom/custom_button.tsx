
import React from 'react';

type CustomButtonProps = {
  title?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function Custom_Button({
  title,
  onClick,
  type = 'submit',
  className = 'btn btn-neutral bg-gradient-to-r from-main  to-main/50  text-white w-full h-13 rounded-xl hover:bg-main/80 transition-colors',
  disabled = false,
  children,
}: CustomButtonProps = {}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {title || children}
    </button>
  );
}
