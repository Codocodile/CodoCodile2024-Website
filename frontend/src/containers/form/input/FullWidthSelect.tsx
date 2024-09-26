import { Select, Option } from "@material-tailwind/react";

function FullWidthSelect({
  label,
  name,
  options,
  id,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  id: string;
  onChange: any;
}) {
  return (
    <div className="w-full px-3 mt-3">
      <label
        className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <Select
        value={options[0]}
        onChange={onChange}
        label={label}
        name={name}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {options.map((option, index) => (
          <Option key={index} value={option}>{option}</Option>
        ))}
      </Select>
    </div>
  );
}

export default FullWidthSelect;
