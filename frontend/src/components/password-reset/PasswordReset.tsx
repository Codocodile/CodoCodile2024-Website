import { useParams } from "react-router-dom";
import Form from "../../containers/form/Form.tsx";

function PasswordReset() {
  const { token } = useParams();
  return <Form headerText={"Password Reset"} token={token} />;
}

export default PasswordReset;
