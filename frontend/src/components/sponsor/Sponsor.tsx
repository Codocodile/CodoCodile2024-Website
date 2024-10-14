import {Footer, Section, TextOnlySection} from "../../containers";
import {Navbar} from "../";
import {
    SPONSOR_CAREER_LINK,
    SPONSOR_CONTACTUS_LINK,
    SPONSOR_INTRODUCTION, SPONSOR_INTRODUCTION2, SPONSOR_SOCIALS
} from "../../global-constants/SponsorConstants.ts";
import {SPONSOR_COLOR} from "../../global-constants/SponsorConstants.ts";
import SocialIconsWithHeader from "../social-icon/SocialIconsWithHeader.tsx";


function Landing() {

    return (
        <>
            <Navbar/>

            <Section nameColor={SPONSOR_COLOR} name="درباره تپسی" side="left" dino={1} capitalize={false}
                     image={"assets/sponsor/tapsi2.png"} font={"font-dana-bold"}>
                <TextOnlySection
                    text={SPONSOR_INTRODUCTION}
                    font={"font-dana-thin"}/>
            </Section>

            <Section nameColor={SPONSOR_COLOR} name="از خودت سبقت بگیر!" side="right" dino={1} capitalize={false}
                     image={"assets/sponsor/tapsi1.png"} font={"font-dana-bold"}>
                <TextOnlySection
                    text={SPONSOR_INTRODUCTION2}
                    font={"font-dana-thin"}/>
            </Section>

            <div
                className="flex bg-gray-900 pt-12 pb-4 flex-col lg:flex-row items-center justify-center gap-5 mx-auto text-center ">
                <a href={SPONSOR_CAREER_LINK} target={"_blank"}>
                    <button
                        className="font-dana-thin bg-[#FF5B35] hover:bg-[#C74D30FF] text-white font-bold py-2 px-4 border border-[#FF5B35] rounded-lg ">
                        موقعیت‌های شغلی
                    </button>
                </a>
                <a href={SPONSOR_CONTACTUS_LINK} target={"_blank"}>
                    <button
                        className="font-dana-thin bg-white hover:bg-[#FFF0ECFF]  font-bold py-2 px-4 text-[#FF5B35] rounded-lg">
                        تماس با ما
                    </button>
                </a>
            </div>

            <div className="flex bg-gray-900 flex-col items-center justify-center mx-auto text-center gap-4 pb-8">
                <SocialIconsWithHeader data={SPONSOR_SOCIALS}/>
            </div>


            <Footer/>
        </>
    )
        ;
}

export default Landing;
