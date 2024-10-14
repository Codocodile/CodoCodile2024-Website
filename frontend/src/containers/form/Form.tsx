import HalfWidthInput from "./input/HalfWidthInput.tsx";
import FullWidthInput from "./input/FullWidthInput.tsx";
import FullWidthSelect from "./input/FullWidthSelect.tsx";
import FormHeader from "./FormHeader.tsx";
import FullWidthCheckbox from "./input/FullWidthCheckbox.tsx";
import axios from "axios";
import {Alert, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {useNavigate, NavigateFunction} from "react-router-dom";
import {urls, API_URL} from "../../global-constants/Variables.ts";
import {NavLink} from "react-router-dom";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function validateFile(file: File | null): { isValid: boolean; error: string } {
    if (file?.size === 0 || !file) {
        return {isValid: true, error: "No file uploaded."};
    }

    if (file.type !== "application/pdf") {
        return {isValid: false, error: "Only PDF files are allowed."};
    }

    if (file.size > 10 * 1024 * 1024) {
        return {isValid: false, error: "File size must be less than 10MB."};
    }

    return {isValid: true, error: ""};
}

function signUp(
    e: React.FormEvent<HTMLFormElement>,
    setSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailureAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailureResponse: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction,
    status: string,
    gender: string
) {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const object: any = {};
    data.forEach(function (value, key) {
        object[key] = value;
    });
    const file = data.get("cvfile") as File | null;
    const {isValid, error} = validateFile(file);

    if (!isValid) {
        setFailureResponse(error);
        setFailureAlert(true);
        delay(3000).then(() => setFailureAlert(false));
        return;
    }

    object["is_workshop_attender"] = object["is_workshop_attender"] === "on";
    if (status === "Junior (Highschool)") {
        object["status"] = "J";
    } else if (status === "Senior (University)") {
        object["status"] = "S";
    } else {
        object["status"] = "P";
    }
    object["gender"] = gender === "Male" ? "M" : "F";
    object["user"] = {
        email: object["email"],
        password: object["password"],
        first_name: object["first_name"],
        last_name: object["last_name"],
    };
    if (object["cvfile"].size === 0) {
        object["cvfile"] = null;
    }
    delete object["email"];
    delete object["password"];
    delete object["first_name"];
    delete object["last_name"];
    console.log(object)
    axios
        .post(API_URL + "/api/create-challenger/", object)
        .then((res) => {
            if (res.status === 201 || res.status === 200) {
                setSuccessAlert(true);
                delay(3000).then(() => {
                    navigate(urls.landing);
                });
            } else {
                setFailureResponse("Something went wrong!");
                setFailureAlert(true);
                delay(3000).then(() => {
                    setFailureAlert(false);
                });
            }
        })
        .catch((err) => {
            var errors = err.response.data.errors;
            if (errors) {
                var error = errors[0].detail;
                if (error == "UNIQUE constraint failed: auth_user.username") {
                    error = "This phone number is already taken!";
                }
                setFailureResponse(error);
            } else {
                setFailureResponse("Something went wrong!");
            }
            setFailureAlert(true);
            delay(3000).then(() => {
                setFailureAlert(false);
            });
        });
}

function signIn(
    e: React.FormEvent<HTMLFormElement>,
    setSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailureAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailureResponse: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const object: any = {};
    data.forEach(function (value, key) {
        object[key] = value;
    });
    object["username"] = object["phone_number"];
    delete object["phone_number"];
    axios
        .post(API_URL + "/api/token/", object)
        .then((res) => {
            if (res.status === 201 || res.status === 200) {
                setSuccessAlert(true);
                localStorage.setItem("auth.access", res.data.access);
                localStorage.setItem("auth.refresh", res.data.refresh);
                delay(3000).then(() => {
                    navigate(urls.profile);
                });
            } else {
                setFailureResponse("Something went wrong!");
                setFailureAlert(true);
                delay(3000).then(() => {
                    setFailureAlert(false);
                });
            }
        })
        .catch((err) => {
            var errors = err.response.data.errors;
            if (errors) {
                var error = errors[0].detail;
                if (error == "UNIQUE constraint failed: auth_user.username") {
                    error = "This phone number is already taken!";
                }
                setFailureResponse(error);
            } else {
                setFailureResponse("Something went wrong!");
            }
            setFailureAlert(true);
            delay(3000).then(() => {
                setFailureAlert(false);
            });
        });
}

function passwordReset(
    e: React.FormEvent<HTMLFormElement>,
    setSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailureAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailureResponse: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction,
    token: string
) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const object: any = {};
    data.forEach(function (value, key) {
        object[key] = value;
    });
    object["token"] = token;
    axios
        .put(API_URL + "/api/password-reset/", object)
        .then((res) => {
            if (res.status === 201 || res.status === 200) {
                setSuccessAlert(true);
                delay(3000).then(() => {
                    navigate(urls.signIn);
                });
            } else {
                setFailureResponse("Something went wrong!");
                setFailureAlert(true);
                delay(3000).then(() => {
                    setFailureAlert(false);
                });
            }
        })
        .catch((err) => {
            var errors = err.response.data.errors;
            if (errors) {
                var error = errors[0].detail;
                setFailureResponse(error);
            } else {
                setFailureResponse("Something went wrong!");
            }
            setFailureAlert(true);
            delay(3000).then(() => {
                setFailureAlert(false);
            });
        });
}

function forgetPassword(
    e: React.FormEvent<HTMLFormElement>,
    setSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailureAlert: React.Dispatch<React.SetStateAction<boolean>>,
    setFailureResponse: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const object: any = {};
    data.forEach(function (value, key) {
        object[key] = value;
    });
    axios
        .post(API_URL + "/api/password-reset/", object)
        .then((res) => {
            if (res.status === 201 || res.status === 200) {
                setSuccessAlert(true);
                delay(3000).then(() => {
                    navigate(urls.landing);
                });
            } else {
                setFailureResponse("Something went wrong!");
                setFailureAlert(true);
                delay(3000).then(() => {
                    setFailureAlert(false);
                });
            }
        })
        .catch((err) => {
            var errors = err.response.data.errors;
            if (errors) {
                var error = errors[0].detail;
                setFailureResponse(error);
            } else {
                setFailureResponse("Something went wrong!");
            }
            setFailureAlert(true);
            delay(3000).then(() => {
                setFailureAlert(false);
            });
        });
}

function Form({
                  headerText,
                  token,
              }: {
    headerText: "Sign In" | "Sign Up" | "Password Reset" | "Forget Password";
    token?: string;
}) {
    const [successAlert, setSuccessAlert] = useState(false);
    const [failureAlert, setFailureAlert] = useState(false);
    const [failureResponse, setFailureResponse] = useState("");
    const [status, setStatus] = useState("Junior (Highschool)");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();

    return (
        <div
            className={
                "flex justify-start items-center flex-col bg-gradient-to-b from-green-900 to-gray-900 min-h-screen h-full"
            }
        >
            <FormHeader text={headerText}/>
            <form
                onSubmit={(e) => {
                    if (headerText === "Sign Up") {
                        signUp(
                            e,
                            setSuccessAlert,
                            setFailureAlert,
                            setFailureResponse,
                            navigate,
                            status,
                            gender
                        );
                    } else if (headerText == "Sign In") {
                        signIn(
                            e,
                            setSuccessAlert,
                            setFailureAlert,
                            setFailureResponse,
                            navigate
                        );
                    } else if (headerText == "Password Reset") {
                        passwordReset(
                            e,
                            setSuccessAlert,
                            setFailureAlert,
                            setFailureResponse,
                            navigate,
                            token!
                        );
                    } else if (headerText == "Forget Password") {
                        forgetPassword(
                            e,
                            setSuccessAlert,
                            setFailureAlert,
                            setFailureResponse,
                            navigate
                        );
                    }
                }}
                className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-2xl"
            >
                {headerText === "Sign Up" && (
                    <>
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <HalfWidthInput
                                label={"First Name"}
                                name="first_name"
                                placeholder={"First Name"}
                                id={"sign-in-first-name"}
                                type={"text"}
                            />
                            <HalfWidthInput
                                label={"Last Name"}
                                name="last_name"
                                placeholder={"Last Name"}
                                id={"sign-in-last-name"}
                                type={"text"}
                            />
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <HalfWidthInput
                                label={"First Name in Persian"}
                                name="first_name_persian"
                                placeholder={"First Name"}
                                id={"sign-in-first-name-persian"}
                                type={"text"}
                            />
                            <HalfWidthInput
                                label={"Last Name in Persian"}
                                name="last_name_persian"
                                placeholder={"Last Name"}
                                id={"sign-in-last-name-persian"}
                                type={"text"}
                            />
                        </div>
                        {" "}
                    </>
                )}
                <div className="flex flex-wrap -mx-3">
                    {(headerText === "Sign In" || headerText === "Sign Up") && (
                        <FullWidthInput
                            label={"Phone Number"}
                            name="phone_number"
                            placeholder={"09123456789"}
                            id={"sign-in-phone"}
                            type={"text"}
                            pattern="[0-9]{11}"
                        />
                    )}
                    {(headerText === "Sign Up" ||
                        headerText === "Password Reset" ||
                        headerText === "Forget Password") && (
                        <FullWidthInput
                            label={"Email"}
                            name="email"
                            placeholder={"example@gmail.com"}
                            id={"sign-in-email"}
                            type={"email"}
                            pattern="[\w-\.]+@([\w-]+\.)+[\w-]{2,4}"
                        />
                    )}
                    {headerText != "Forget Password" && (
                        <FullWidthInput
                            label={"Password"}
                            name="password"
                            placeholder={"************"}
                            id={"sign-in-password"}
                            type={"password"}
                        />
                    )}
                </div>
                {headerText === "Sign Up" ? (
                    <div className="flex flex-wrap -mx-3 mb-6 gap-2">
                        <FullWidthSelect
                            label={"Division"}
                            options={[
                                "Junior (Highschool)",
                                "Senior (University)",
                                "Pro (Medalist)",
                            ]}
                            onChange={setStatus}
                            name="status"
                            id="sign-in-status"
                        />
                        <FullWidthSelect
                            label={"Gender"}
                            options={["Male", "Female"]}
                            onChange={setGender}
                            name="gender"
                            id="sign-in-gender"
                        />

                        <FullWidthInput
                            label={"Upload CV"}
                            name="cvfile"
                            id="cvfile "
                            type={"file"}
                            accept="application/pdf"
                            required={false}

                        />
                        <FullWidthCheckbox
                            title="Agreement"
                            label={

                                <Typography
                                    as="a"
                                    color={"blue-gray"}
                                    className="font-medium transition-colors"
                                >
                                    I agree that my registration information will be provided to the Sponsor.
                                </Typography>
                            }
                            required={true}
                            name="is_workshop_attender"
                            id="sign-in-workshop"
                        />
                    </div>
                ) : (
                    <></>
                )}
                {headerText === "Sign In" && (
                    <div className="flex flex-wrap mb-3">
                        <NavLink to={urls.forgetPassword}>
                            <Typography
                                color="blue-gray"
                                className="font-medium transition-colors hover:text-blue-700"
                            >
                                Forget Password?
                            </Typography>
                        </NavLink>
                    </div>
                )}
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
                <Alert
                    open={failureAlert}
                    onClose={() => setFailureAlert(false)}
                    color="red"
                    className="mt-5"
                >
                    {failureResponse}
                </Alert>
                <Alert
                    open={successAlert}
                    onClose={() => setSuccessAlert(false)}
                    color="green"
                    className="mt-5"
                >
                    {headerText} Successful!
                </Alert>
            </form>
        </div>
    );
}

export default Form;
