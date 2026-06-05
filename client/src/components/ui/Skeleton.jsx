// src/components/ui/Skeleton.jsx

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded bg-gray-300 dark:bg-gray-700 ${className}`}
    />
  );
};

export default Skeleton;