// client/src/components/ui/InputField.jsx

const InputField = ({
  label,
  name,
  type        = "text",
  value,
  onChange,
  placeholder = "",
  error       = "",
  icon        = null,
  required    = false,
  autoComplete = "off",
}) => {
  return (
    <div className="flex flex-col gap-1.5">

      {/* label */}
      {label && (
        <label
          htmlFor   = {name}
          className = "text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      {/* input wrapper — needed for the icon */}
      <div className="relative">
        {/* left icon if provided */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2
                          text-gray-400 dark:text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          id           = {name}
          name         = {name}
          type         = {type}
          value        = {value}
          onChange     = {onChange}
          placeholder  = {placeholder}
          autoComplete = {autoComplete}
          className    = {`
            w-full rounded-lg border px-4 py-2.5 text-sm
            bg-white dark:bg-dark-100
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-600
            transition-colors duration-150
            outline-none
            focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${icon ? "pl-10" : ""}
            ${error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
            }
          `}
        />
      </div>

      {/* error message */}
      {error && (
        <p className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;

