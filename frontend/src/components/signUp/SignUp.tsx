import Form from "../../containers/form/Form.tsx";
import {Navbar} from "../index.ts";
import {CURRENT_YEAR} from "../../global-constants/LandingConstants.ts";
import {Footer} from "../../containers";

function SignUp() {
    return (
        <>
            <Navbar/>
            <Form headerText={"Sign Up"}/>
            <Footer year={CURRENT_YEAR}/>
        </>
    );
}

export default SignUp;
