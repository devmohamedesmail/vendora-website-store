
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
  className = 'btn btn-neutral bg-main text-white w-full',
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
