import React, { type ReactNode, type ButtonHTMLAttributes } from 'react';

type FilledButtonProps = {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  colorClass?: string; // NOVA PROP PARA CLASSES DE COR
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const FilledButton = ({ 
  children = 'Entrar', 
  onClick, 
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  colorClass = 'bg-red-600 hover:bg-red-700 text-white', // padrão vermelho
  ...props 
}: FilledButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full px-6 py-3 
        font-medium text-sm
        rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        shadow-sm hover:shadow-md
        disabled:bg-red-400 disabled:cursor-not-allowed
        ${loading ? 'cursor-wait' : ''}
        ${colorClass}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
          Carregando...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default FilledButton;