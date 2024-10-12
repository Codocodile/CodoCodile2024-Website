import { Carousel } from "@material-tailwind/react";
import {IStaff} from "../../global-constants/Staff.ts"


interface Props {
  staff: IStaff[];
}

const StaffCarousel = ({ staff }: Props) => {
  return (
    <Carousel transition={{ duration: 0.5 }} className="rounded-xl">
      {staff.map((member) => (
        <div className="flex flex-col items-center justify-center h-96 bg-[#4B5563]">
          <img src={member.image} alt="" className="w-48 h-48 rounded-full" />
          <h1 className="text-2xl font-bold text-white">{member.name}</h1>
          <h2 className="text-xl text-white">{member.title}</h2>
        </div>
      ))}
    </Carousel>
  );
};

export default StaffCarousel;
