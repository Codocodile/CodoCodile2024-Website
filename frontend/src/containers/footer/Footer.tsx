import {Typography} from "@material-tailwind/react";
import {CODOCODILE_SOCIALS, CURRENT_YEAR} from "../../global-constants/LandingConstants.ts";
import SocialIconsWithHeader from "../../components/social-icon/SocialIconsWithHeader.tsx";

const Footer = () => {
    return (
        <div
            className="flex items-center justify-between bg-gradient-to-b from-gray-900 to-blue-gray-900 px-8 pt-8 pb-1 ">
            <div className="flex flex-col gap-2 container mx-auto text-center">
                <SocialIconsWithHeader data={CODOCODILE_SOCIALS} showHeader={false}/>
                <Typography variant="h5" color="white" className="p-1 font-normal">
                    © Codocodile {CURRENT_YEAR}
                </Typography>
            </div>

        </div>
    );
};

export default Footer;
