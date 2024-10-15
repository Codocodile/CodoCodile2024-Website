import {useState} from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import './faq.css'

interface QA {
    question: string;
    answer: string;
}

interface Props {
    data: QA[];
}

const FAQ = ({data}: Props) => {
    const [open, setOpen] = useState(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <>
            {data.map((qa, index) => (
                <Accordion
                    key={index}
                    open={open === index + 1}
                    className="text-right faq"
                >
                    <AccordionHeader

                        onClick={() => handleOpen(index + 1)}
                        className="text-white hover:text-gray-300 text-right "
                    >
                        {qa.question}
                    </AccordionHeader>
                    <AccordionBody className="text-gray-100 ">{qa.answer}</AccordionBody>
                </Accordion>
            ))}
        </>
    );
};

export default FAQ;
