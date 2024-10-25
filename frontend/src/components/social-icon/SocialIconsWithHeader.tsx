import {Typography} from "@material-tailwind/react";
import SocialIcon from "./SocialIcon.tsx";

interface ISocialIconsWithHeader {
    header?: string,
    showHeader: boolean,
    data: {
        name: string;
        link: string;
    }[]
}


const SocialIconsWithHeader = (props: ISocialIconsWithHeader) => {
    return (
        <>
            {props.showHeader && <Typography variant="h6" className={"text-[#FF5B35]"}>
                {props.header}
            </Typography>}
            <div className={"flex flex-row gap-4 justify-center"}>
                {props.data.map((value, index) => (
                    <SocialIcon key={index} socialName={value.name} href={value.link}/>
                ))}
            </div>
        </>
    );
};

export default SocialIconsWithHeader;
