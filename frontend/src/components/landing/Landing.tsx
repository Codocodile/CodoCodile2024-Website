import {Footer, Header, Section, TextOnlySection} from "../../containers";
import {Navbar, EventTimeline, FAQ} from "../";
import {INTRODUCTION} from "../../global-constants/LandingConstants.ts";
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
            <Section name="Introduction" side="right" dino={crocs[0]} font={"font-sans"}
                     image={"assets/crocs/croc-introduction.png"}>
                <TextOnlySection
                    text={INTRODUCTION}
                    font={"font-sans"}/>
            </Section>

            <Section name="Timeline" side="left" dino={crocs[1]} font={"font-sans"}
                     image={"assets/crocs/croc-timeline.png"}>
                <EventTimeline events={TIMELINE_DATA}/>
            </Section>
            {/*{<Section name="staff">*/}
            {/*    <StaffCarousel staff={staff}/>*/}
            {/*</Section>}*/}
            <Section name="FAQ" capitalize={true} side="right" dino={crocs[3]} font={"font-sans"}
                     image={"assets/crocs/croc-faq.png"}>
                <FAQ data={FAQ_DATA} />
            </Section>
            <Footer/>
        </>
    );
}

export default Landing;
