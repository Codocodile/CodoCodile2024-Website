import axios from "axios";
import {API_URL} from "../../global-constants/Variables.ts";

interface IVisitURL {
    url: string
}

export const visitUrl = async (props: IVisitURL) => {
    try {
        const visitedURL: string = `${props.url}`
        await axios.post(`${API_URL}/api/visit`, {url: visitedURL});
    } catch (error) {
        console.error(error);
    }
};
