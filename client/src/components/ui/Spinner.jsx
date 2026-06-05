// src/components/ui/Spinner.jsx

const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-transparent ${sizes[size]}`}
    />
  );
};

export default Spinner;