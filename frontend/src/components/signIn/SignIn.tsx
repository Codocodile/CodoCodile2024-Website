import {useEffect} from "react";
import Form from "../../containers/form/Form.tsx";
import {useNavigate} from "react-router-dom";
import {urls} from "../../global-constants/Variables.ts";
import {Navbar} from "../index.ts";
import {CURRENT_YEAR} from "../../global-constants/LandingConstants.ts";
import {Footer} from "../../containers";

function SignIn() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("auth.refresh") != undefined) {
            navigate(urls.profile);
        }
    }, []);
    return (
        <>
            <Navbar/>
            <Form headerText={"Sign In"}/>
            <Footer year={CURRENT_YEAR}/>
        </>
    );
}

export default SignIn;
