import {useState} from 'react';
import {eyePassword, eyePasswordUnhide} from '../../../../public/assets/icons/EyePassword.tsx';

interface IFullWidthInputProps {
    label: string;
    name: string;
    placeholder: string;
    id: string;
    type: 'text' | 'password' | 'email';
    pattern?: string;
}

function FullWidthInput(props: IFullWidthInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full px-3 relative">
            <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={props.id}
            >
                {props.label}
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id={props.id}
                type={showPassword ? 'text' : props.type}
                placeholder={props.placeholder}
                required={true}
                name={props.name}
                pattern={props.pattern}
            />
            {props.type === 'password' && (
                <button
                    type="button"
                    className="absolute right-5 top-9"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? eyePasswordUnhide : eyePassword}
                </button>

            )}
        </div>
    );
}

export default FullWidthInput;
