import React, { ReactNode, ButtonHTMLAttributes } from 'react';

type OutlinedButtonProps = {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const OutlinedButton = ({ 
  children = 'Entrar', 
  onClick, 
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  ...props 
}: OutlinedButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full px-6 py-3 
        bg-transparent hover:bg-red-50 
        active:bg-red-100 
        disabled:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400
        text-red-600 font-medium text-sm
        border-2 border-red-600 hover:border-red-700
        disabled:border-gray-300
        rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent mr-2"></div>
          Carregando...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default OutlinedButton;