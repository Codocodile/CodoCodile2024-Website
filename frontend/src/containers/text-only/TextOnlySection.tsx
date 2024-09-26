import { Typography } from "@material-tailwind/react";

interface Props {
  text: string;
}

const TextOnlySection = ({ text }: Props) => {
  return (
    <Typography variant="h6" color="white" className="text-right" dir="rtl">
      {text}
    </Typography>
  );
};

export default TextOnlySection;
