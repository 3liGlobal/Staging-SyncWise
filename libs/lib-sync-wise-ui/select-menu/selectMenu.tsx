import Select, { SingleValue } from "react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "../../lib-sync-wise-utils";

export type SelectMenuProps = {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  isObject?: boolean;
  placeholder?: string;
  showError?: boolean;
  value?: { label: string; value: string };
  onBlur?: (value: string | object) => void;
  onChange?: (value: string | object | null | undefined) => void;
  options?: Array<{ label: string; value: string }>;
  extraClasses?: string;
  valueContainerClass?: string;
  required?: boolean;
  isMulti?: boolean;
};

export function SelectMenu(props: SelectMenuProps) {
  const {
    id,
    label,
    name,
    value,
    options,
    disabled = false,
    onChange,
    onBlur,
    placeholder,
    error,
    showError,
    isObject = false,
    required = false,
    extraClasses = "",
    valueContainerClass = "",
    isMulti = false,
  } = props;
  const className =
    "block w-full rounded-lg border border-blue-950 py-2.5 px-3 placeholder:text-grey-600 placeholder:font-medium text-sm text-blue-950 outline-none";

  function resolveValue(value?: string | object) {
    if (typeof value === "string") {
      return options?.filter((e) => e.value === value);
    }

    return value;
  }

  // eslint-disable-next-line
  function handleSubmit(value: SingleValue<any>) {
    const selectedValue = isMulti
      ? isObject
        ? value.value
        : value
      : value.value;
    onChange?.(selectedValue);
  }

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            "block text-lg text-black font-medium mb-1 lg:mb-1.5 2xl:mb-2.5",
          )}
        >
          {label}
          {required && <span className="text-orange-600 ml-1">*</span>}
        </label>
      )}

      <Select
        inputId={id}
        name={name}
        onBlur={onBlur}
        unstyled={true}
        options={options}
        isMulti={isMulti}
        isDisabled={disabled}
        placeholder={placeholder}
        value={resolveValue(value)}
        onChange={handleSubmit}
        styles={{
          input: (baseStyles) => ({
            ...baseStyles,
            "input:focus": {
              boxShadow: "none",
            },
          }),
        }}
        classNames={{
          placeholder: ({ isDisabled }) =>
            isDisabled ? "text-grey-800" : "text-gray-600",
          control: ({ isDisabled }) =>
            `${className} ${
              isDisabled ? "!bg-grey-200 !border-0 !ring-0 !shadow-none" : ""
            } ${extraClasses}`,
          menu: () => `${className} bg-white`,
          option: () =>
            "text-sm py-2.5 hover:bg-primary-hover hover:text-white",
          noOptionsMessage: () => "p-sm p-2.5 text-black",

          valueContainer: () => `p-sm text-black ${valueContainerClass}`,
        }}
        components={{
          Option: ({ data, isSelected, selectOption }) => (
            <div
              onClick={() => selectOption(data)}
              className={`flex hover:bg-primary-hover hover:text-white text-black relative cursor-default items-center select-none py-2 pl-3 pr-4 ${
                isSelected ? "text-base" : "text-sm"
              }`}
            >
              {
                // eslint-disable-next-line
                // @ts-ignore
                <span className="flex-grow">{data.label}</span>
              }
              {isSelected && (
                <CheckIcon className="h-4 w-4" aria-hidden="true" />
              )}
            </div>
          ),
          DropdownIndicator: () => (
            <ChevronDownIcon
              className="h-4 w-4 text-black"
              aria-hidden="true"
            />
          ),
          ClearIndicator: ({ isFocused, clearValue }) =>
            isFocused && <XMarkIcon className="h-7" onClick={clearValue} />,
        }}
      />

      {showError && Boolean(error) && (
        <span className="text-red-600 text-xs 2xl:text-sm font-light 2xl:font-normal">
          {error}
        </span>
      )}
    </div>
  );
}
