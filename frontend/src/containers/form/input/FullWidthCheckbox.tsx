import {Checkbox} from "@material-tailwind/react";

function FullWidthCheckbox({
                               required,
                               label,
                               name,
                               title,
                               id,
                           }: {
    required?: boolean,
    label: React.ReactNode;
    name: string;
    title: string;
    id: string;
}) {
    return (
        <div className="w-full px-3 mt-3">
            <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={id}
            >
                {title}
            </label>
            <Checkbox
                required={required}
                label={label}
                className=""
                crossOrigin=""
                name={name}
            />
        </div>
    );
}

export default FullWidthCheckbox;
