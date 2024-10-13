import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
    Card,
} from "@material-tailwind/react";
import './timeline.css'

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
}

interface Props {
    events: TimelineEvent[];
}

const EventTimeline = ({events}: Props) => {
    return (
        <Card color="gray" className="mx-auto items-center p-4 bg-gray-600">
            <Timeline>
                {events.map((event, index) => (
                    <TimelineItem className="timeline-item" key={index}>
                        {index != events.length - 1 && <TimelineConnector/>}
                        <TimelineHeader className="h-3">
                            <TimelineIcon/>
                            <Typography
                                variant="h4"
                                color="blue-gray"
                                className="leading-none text-white"
                            >
                                {event.title}
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="mb-5 w-full">
                            <Typography
                                variant="h5"
                                color="gray"
                                className="font-normal text-left text-gray-200"
                            >
                                {event.date}
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-normal w-full text-gray-200 text-right timeline-description text-justify"
                            >
                                {event.description}
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                ))}
            </Timeline>
        </Card>
    );
};

export default EventTimeline;
