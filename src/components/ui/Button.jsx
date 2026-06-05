// client/src/components/ui/Button.jsx

import Spinner from "./Spinner";

// variant controls the visual style
// size controls padding and font size

const Button = ({
  children,
  onClick,
  type      = "button",
  variant   = "primary",
  size      = "md",
  isLoading = false,
  disabled  = false,
  fullWidth = false,
  className = "",
}) => {

  const base = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    focus:ring-primary-500 focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    cursor-pointer
  `;

  const variants = {
    primary: `
      bg-primary-500 text-white
      hover:bg-primary-600 active:bg-primary-700
    `,
    secondary: `
      bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-700
      border border-gray-200 dark:border-gray-600
    `,
    ghost: `
      text-gray-600 dark:text-gray-400
      hover:bg-gray-100 dark:hover:bg-dark-100
    `,
    danger: `
      bg-red-500 text-white
      hover:bg-red-600 active:bg-red-700
    `,
    outline: `
      border border-primary-500 text-primary-500
      hover:bg-primary-500 hover:text-white
    `,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  //return the button element with appropriate classes based on the version.
  return (
    <button
      type      = {type}
      onClick   = {onClick}
      disabled  = {disabled || isLoading}
      className = {`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {isLoading && <Spinner size="sm" />}
      {children}
    </button>
  );
};

export default Button;

