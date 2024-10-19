import {Input} from "@material-tailwind/react";

interface Props {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    isValid ?: boolean;
}

const InputText = ({placeholder, value, onChange,isValid}: Props) => {
    return (
        <Input
            type="text"
            color="light-blue"
            size="md"
            label={placeholder}
            // placeholder={placeholder}
            className="text-white"
            crossOrigin=""
            value={value}
            onChange={onChange}
            error={!isValid}
        />
    );
};

export default InputText;