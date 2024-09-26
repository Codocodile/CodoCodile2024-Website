import { Typography } from "@material-tailwind/react";
import "./section.css";
import { useState } from "react";

interface Props {
  name: string;
  capitalize?: boolean;
  children: React.ReactNode;
  side?: "left" | "right";
  dino?: number;
}

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

function slugify(str: string) {
  return str.toLowerCase().split(" ").join("-");
}

const Section = ({ name, capitalize, children, side, dino }: Props) => {
  const [dinoIcon] = useState(dino === undefined ? 1 + Math.floor(Math.random() * 15): dino);

  return (
    <div id={slugify(name)} className="flex bg-gray-900 pt-8">
      <div className="flex flex-col lg:flex-row items-center justify-between mx-auto text-center">
        <img
          src={"/assets/crocs/" + dinoIcon + ".png"}
          height="auto"
          className={
            (side == "left" ? "block" : "hidden") +
            " lg:mr-40 w-[48rem] md:w-[20rem]"
          }
        />
        <div className="container sm:w-[28rem] md:w-[36rem] lg:w-[48rem] mx-auto text-center pl-4 pr-4">
          <Typography
            variant="h1"
            color="white"
            className="text-white mb-6 mt-6 section-title"
          >
            {capitalize ? name.toUpperCase() : titleCase(name)}
          </Typography>
          {children}
        </div>
        <img
          src={"/assets/crocs/" + dinoIcon + ".png"}
          height="auto"
          className={
            (side == "right" ? "block" : "hidden") +
            " lg:ml-40 w-[48rem] md:w-[20rem]"
          }
        />
      </div>
    </div>
  );
};

export default Section;
