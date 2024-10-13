import {Footer, Section, TextOnlySection} from "../../containers";
import {Navbar} from "../";
import {
    SPONSOR_CAREER_LINK,
    SPONSOR_CONTACTUS_LINK,
    SPONSOR_INTRODUCTION
} from "../../global-constants/SponsorConstants.ts";
import {SPONSOR_COLOR} from "../../global-constants/SponsorConstants.ts";


function Landing() {

    return (
        <>
            <Navbar/>

            <Section nameColor={SPONSOR_COLOR} name="Sponsor of Event" side="left" dino={1} capitalize={false}
                     image={"assets/sponsor/tapsi-logo-fa.png"} font={"font-dana-bold"}>
                <TextOnlySection
                    text={SPONSOR_INTRODUCTION}
                    font={"font-dana-thin"}/>
            </Section>
            <Section nameColor={SPONSOR_COLOR} name="Sponsor of Event" side="right" dino={1} capitalize={false}
                     image={"assets/sponsor/tapsi-logo-fa.png"} font={"font-dana-bold"}>
                <TextOnlySection
                    text={SPONSOR_INTRODUCTION}
                    font={"font-dana-thin"}/>
            </Section>

            <div
                className="flex bg-gray-900 py-12 flex-col lg:flex-row items-center justify-center gap-5 mx-auto text-center">
                <a href={SPONSOR_CAREER_LINK} target={"_blank"}>
                    <button
                        className="font-dana-thin bg-[#FF5B35] hover:bg-[#C74D30FF] text-white font-bold py-2 px-4 border border-[#FF5B35] rounded-lg">
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


            <Footer/>
        </>
    )
        ;
}

export default Landing;
