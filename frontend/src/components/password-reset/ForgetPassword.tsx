import Form from "../../containers/form/Form.tsx";
import {Navbar} from "../index.ts";

function ForgetPassword() {
    return (
        <>
            <Navbar/>
            <Form headerText={"Forget Password"}/>
        </>
    );
}

export default ForgetPassword;
