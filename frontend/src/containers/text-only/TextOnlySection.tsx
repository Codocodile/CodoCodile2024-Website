import {Typography} from "@material-tailwind/react";

interface ITextOnlySectionProps {
    text: string;
    font: "font-sans" | "font-dana-thin" | "font-dana-regular" | "font-dana-bold";
}

const TextOnlySection = (props: ITextOnlySectionProps) => {
    return (
        <Typography variant="h6" color="white"
                    className={`text-right ${props.font !== undefined ? props.font : "font-sans"} text-justify`} dir="rtl">
            {props.text}
        </Typography>
    );
};

export default TextOnlySection;
