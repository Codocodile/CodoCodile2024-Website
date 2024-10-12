import {Footer, Header, Section, TextOnlySection} from "../../containers";
import {Navbar, EventTimeline, FAQ, StaffCarousel} from "../";
import {staff} from "../../global-constants/Staff.ts";
import {CURRENT_YEAR, INTRODUCTION, SPONSOR_INTRODUCTION} from "../../global-constants/LandingConstants.ts";
import {TIMELINE_DATA} from "../../global-constants/TimeLine.ts";
import {FAQ_DATA} from "../../global-constants/FAQ-Data.ts";

function shuffle(array: number[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const crocs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);


function Landing() {
    return (
        <>
            <Navbar/>
            <Header/>
            <Section name="introduction" side="right" dino={crocs[0]}>
                <TextOnlySection
                    text={INTRODUCTION}
                />
            </Section>
            <a href={"/sponsor"}>
                <Section nameColor={"#FF5B35"} name="Tapsi ~ Sponsor of Event" side="left" dino={crocs[2]}
                         image={"assets/tapsi-logo-fa.png"}>
                    <TextOnlySection
                        text={SPONSOR_INTRODUCTION}
                    />
                </Section>
            </a>
            <Section name="timeline" side="left" dino={crocs[1]}>
                <EventTimeline events={TIMELINE_DATA}/>
            </Section>
            {<Section name="staff">
                <StaffCarousel staff={staff}/>
            </Section>}
            <Section name="FAQ" capitalize={true} side="right" dino={crocs[3]}>
                <FAQ data={FAQ_DATA}/>
            </Section>
            <Footer year={CURRENT_YEAR}/>
        </>
    );
}

export default Landing;
