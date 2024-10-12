import {Navigate} from "react-router-dom";
import {urls} from "../../global-constants/Variables.ts";
import React from "react";
import {visitUrl} from "./visitUrl.ts";

interface IVisitProps {
    pathName: string;
}


const Visit: React.FC<IVisitProps> = (props) => {
    visitUrl({url: props.pathName});
    return <Navigate to={urls.landing}/>;
};

export default Visit;
