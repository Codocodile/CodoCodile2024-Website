import {Footer, Section, TextOnlySection} from "../../containers";
import {Navbar} from "../";
import {SPONSOR_INTRODUCTION} from "../../global-constants/LandingConstants.ts";


function Landing() {
    const tapsiSections = [
        {
            title: "تپسی کلاسیک",
            description: "با سرویس کلاسیک تپسی، یک خودروی اختصاصی برای رسیدن به مقصدتان دارید. تپسی کلاسیک، راهی سریع و آسان برای سفرهای درون‌شهری در هر ساعتی از روز است. در این سرویس، شما امکان تعیین دو یا چند مقصد و همچنین توقف در مسیر را دارید."
            , image: "assets/tapsi1.webp"
        },
        {
            title: "تپسی تلفنی",
            description: "سرویس تپسی تلفنی یا ۱۶۳۰، این امکان را به شما می‌دهد که بدون نیاز به اینترنت و اپلیکیشن، درخواست خودرو بدهید. این سرویس تاکسی تلفنی مناسب زمانی است که به هر دلیلی دسترسی به اینترنت یا اپلیکیشن ندارید. همچنین سرویس تلفنی تپسی، راه حلی مناسب برای افرادی است که کار کردن با اپلیکیشن‌های موبایلی برایشان راحت نیست."
            , image: "assets/tapsi2.webp"
        },
        {
            title: "تپسی لاین",
            description: "تپسی لاین سرویسی است که امکان سفر اشتراکی را برایتان فراهم می‌کند. در این سرویس شما با مسافر دیگری که هم‌مسیرتان است، هم‌سفر خواهید بود و هزینه سفرتان تقسیم می‌شود."
            , image: "assets/tapsi3.webp"
        },
        {
            title: "موتوپیک",
            description: "با استفاده از سرویس موتوپیک، بسته‌ها و مرسولاتتان با پیک موتور به مقصد ارسال می‌شوند. این سرویس مناسب زمانی است که می‌خواهید مرسوله سریع‌تر به مقصد برسد. در این سرویس، شما می‌توانید مسیر رسیدن مرسوله‌تان به مقصد را به صورت لحظه‌ای روی نقشه دنبال کنید."
            , image: "assets/tapsi4.webp"
        },
        {
            title: "اتوپیک",
            description: "اتوپیک سرویسی برای ارسال بسته‌های شما با خودرو است. این سرویس، برای زمانی مناسب است که بسته‌های شما، با موتور قابل ارسال نیستند و یا در حین جابجایی، نیاز به مراقبت بیشتری دارند. در این سرویس نیز امکان رصد لحظه ‌به لحظه موقعیت مکانی مرسوله تا زمان رسیدن به مقصد فراهم است."
            , image: "assets/tapsi5.webp"
        },
        {
            title: "تپسی پلاس",
            description: "در سرویس پلاس تاکسی اینترنتی تپسی، خودرویی با مدل بالاتر و عمر کمتر، به دنبال شما خواهد آمد. همچنین، رانندگان این سرویس بالاترین امتیاز را از مسافران دریافت کرده‌اند. در این سرویس امکان تعیین چند مقصد یا توقف در حین سفر، وجود دارد."
            , image: "assets/tapsi6.webp"
        },

    ]
    return (
        <>
            <Navbar/>

                <Section nameColor={"#FF5B35"} name="Tapsi ~ Sponsor of Event" side="left" dino={1}
                         image={"assets/tapsi-logo-fa.png"}>
                    <TextOnlySection
                        text={SPONSOR_INTRODUCTION}
                        font={"font-sans"}/>
                </Section>

            {tapsiSections.map((tapsiSection, key) => (
                <Section
                    name={tapsiSection.title}
                    side={key % 2 === 0 ? "right" : "left"}
                    key={key}
                    dino={key + 1}
                    image={tapsiSection.image}
                >
                    <TextOnlySection
                        text={tapsiSection.description}
                     font={"font-dana"}/>
                </Section>
            ))}


            <Footer year={"2024"}/>
        </>
    );
}

export default Landing;
