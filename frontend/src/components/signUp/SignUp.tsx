import Form from "../../containers/form/Form.tsx";
import {Navbar} from "../index.ts";
import {Footer} from "../../containers";

function SignUp() {
    return (
        <>
            <Navbar/>
            <Form headerText={"Sign Up"}/>
            <Footer/>
        </>
    );
}

export default SignUp;
