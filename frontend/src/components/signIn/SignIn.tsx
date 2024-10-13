import {useEffect} from "react";
import Form from "../../containers/form/Form.tsx";
import {useNavigate} from "react-router-dom";
import {urls} from "../../global-constants/Variables.ts";
import {Navbar} from "../index.ts";
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
            <Footer />
        </>
    );
}

export default SignIn;
