import { useEffect } from "react";
import Form from "../../containers/form/Form.tsx";
import { useNavigate } from "react-router-dom";
import { urls } from "../../global/Variables.ts";

function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth.refresh") != undefined) {
      navigate(urls.profile);
    }
  }, []);
  return <Form headerText={"Sign In"} />;
}

export default SignIn;
