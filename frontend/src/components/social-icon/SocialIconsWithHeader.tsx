import {Typography} from "@material-tailwind/react";
import SocialIcon from "./SocialIcon.tsx";

interface ISocialIconsWithHeader {
    data: {
        name: string;
        link: string;
    }[]
}


const SocialIconsWithHeader = (props: ISocialIconsWithHeader) => {
    return (
        <>
            <Typography variant="h6" className={"text-[#FF5B35]"}>
                تپسی در شبکه‌های اجتماعی
            </Typography>
            <div className={"flex flex-row gap-4"}>
                {props.data.map((value, index) => (
                    <SocialIcon key={index} socialName={value.name} href={value.link}/>
                ))}
            </div>
        </>
    );
};

export default SocialIconsWithHeader;
