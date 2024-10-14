import {API_URL} from "../../global-constants/Variables.ts";

interface IVisitURL {
    url: string
}

// export const visitUrl = async (props: IVisitURL) => {
//     try {
//         const visitedURL: string = `${props.url}`
//         console.log(`${API_URL}/api/visit`)
//         console.log({url: visitedURL})
//         await axios.post(`${API_URL}/api/visit/`, {url: visitedURL});
//     } catch (error) {
//         console.error(error);
//     }
// };

export const visitUrl = async (props: IVisitURL) => {
    try {
        const visitedURL = `${props.url}`;
        const response = await fetch(`${API_URL}/api/visit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: visitedURL}),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();
    } catch (error) {
        console.error(error);
    }
};