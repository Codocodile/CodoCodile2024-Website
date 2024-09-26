import { Carousel } from "@material-tailwind/react";

interface Staff {
  name: string;
  title: string;
  image: string;
}

interface Props {
  staff: Staff[];
}

const StaffCarousel = ({ staff }: Props) => {
  return (
    <Carousel transition={{ duration: 0.5 }} className="rounded-xl">
      {staff.map((member) => (
        <div className="flex flex-col items-center justify-center h-96 bg-gray-100">
          <img src={member.image} alt="" className="w-48 h-48 rounded-full" />
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <h2 className="text-xl">{member.title}</h2>
        </div>
      ))}
    </Carousel>
  );
};

export default StaffCarousel;
