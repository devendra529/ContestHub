// client/src/components/ui/EmptyState.jsx
// it is a reusable components to display empty states across the app with a consistent design.
const EmptyState = ({ emoji, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center
                    py-20 text-center px-4">
      <span className="text-6xl mb-4">{emoji || "📭"}</span>
      <h3 className="text-lg font-semibold text-gray-700
                      dark:text-gray-300 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-400 dark:text-gray-500 text-sm
                      max-w-xs leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action && action}
    </div>
  );
};

export default EmptyState;

