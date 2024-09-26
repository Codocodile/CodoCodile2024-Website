import { Input } from "@material-tailwind/react";

interface Props {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputText = ({ placeholder, value, onChange }: Props) => {
  return (
    <Input
      type="text"
      color="light-blue"
      size="md"
      placeholder={placeholder}
      className="text-white"
      crossOrigin=""
      value={value}
      onChange={onChange}
    />
  );
};

export default InputText;
