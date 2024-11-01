import React, {useEffect, useState} from "react";
import {Section} from "../../containers";
import axios from "axios";
import {RefreshToken} from "../panel/Panel";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {urls, API_URL} from "../../global-constants/Variables";
import {useRef} from "react";

import {
    Input,
    Select,
    Textarea,
    Option,
    Button,
    Alert,
} from "@material-tailwind/react";
import "./profile.css";
import InputText from "./InputText";

function loadChallenger(
    navigate: NavigateFunction,
    setData: React.Dispatch<any>,
    is_crashed: boolean
) {
    axios
        .get(API_URL + "/api/view-challenger/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth.access"),
            },
        })
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            if (is_crashed) {
                navigate(urls.signIn);
                return;
            }
            if (err.response.status === 401) {
                if (!RefreshToken()) {
                    navigate(urls.signIn);
                    return;
                }
                loadChallenger(navigate, setData, true);
            }
        });
}

function confirmChallenger(
    navigate: NavigateFunction,
    setVerification: React.Dispatch<boolean>,
    is_crashed: boolean
) {
    axios
        .get(API_URL + "/api/confirm-challenger/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth.access"),
            },
        })
        .then(() => {
            setVerification(true);
        })
        .catch((err) => {
            if (is_crashed) {
                navigate(urls.signIn);
                return;
            }
            if (err.response.status === 401) {
                if (!RefreshToken()) {
                    navigate(urls.signIn);
                    return;
                }
                confirmChallenger(navigate, setVerification, true);
            }
        });
}

function verifyCode(
    navigate: NavigateFunction,
    data: any,
    setVerification: React.Dispatch<boolean>,
    is_crashed: boolean
) {
    axios
        .post(
            API_URL + "/api/confirm-challenger/",
            {confirmation_code: data.confirmation_code},
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("auth.access"),
                },
            }
        )
        .then(() => {
            setVerification(false);
            data.is_confirmed = true;
        })
        .catch((err) => {
            if (is_crashed) {
                navigate(urls.signIn);
                return;
            }
            if (err.response.status === 401) {
                if (!RefreshToken()) {
                    navigate(urls.signIn);
                    return;
                }
                verifyCode(navigate, data, setVerification, true);
            }
        });
}

function updateChallenger(
    navigate: NavigateFunction,
    data: any,
    setAlertSuccess: React.Dispatch<boolean>,
    setFailureMessage: React.Dispatch<string>,
    is_crashed: boolean
) {
    axios
        .put(API_URL + "/api/update-challenger/", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth.access"),
            },
        })
        .then(() => {
            setAlertSuccess(true);
            setTimeout(() => {
                setAlertSuccess(false);
            }, 3000);
        })
        .catch((err) => {
            if (is_crashed) {
                navigate(urls.signIn);
                return;
            }
            if (err.response.status === 401) {
                if (!RefreshToken()) {
                    navigate(urls.signIn);
                    return;
                }
                updateChallenger(
                    navigate,
                    data,
                    setAlertSuccess,
                    setFailureMessage,
                    true
                );
            } else {
                setFailureMessage(err.response.data.errors[0].detail);
                setTimeout(() => {
                    setFailureMessage("");
                }, 3000);
            }
        });
}

const Profile = () => {
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [failureMessage, setFailureMessage] = useState("");
    const [data, setData] = useState({} as any);
    const [verification, setVerification] = useState(false);
    const navigate = useNavigate();

    useEffect(() => loadChallenger(navigate, setData, false), []);
    const fileInputRef = useRef<HTMLInputElement>(null);
    console.log(data)
    const handleSubmit = async (e: React.FormEvent) => {
        console.log(data)
        e.preventDefault();
        if (fileInputRef.current !== null && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
            const originalFile = fileInputRef.current.files[0] as File;
            const renamedFile = new File([originalFile], `${data.phone_number}.pdf`, {type: originalFile.type});
            const formData = new FormData();
            formData.append("cv_file", renamedFile);
            formData.append("phone_number", data?.phone_number);
            try {
                const response = await fetch(API_URL + "/api/cv/", {
                    method: "PUT",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("auth.access")}`
                    }
                });
                if (response.ok) {
                    console.log("CV successfully uploaded");
                } else {
                    console.error("Failed to upload CV");
                }
            } catch (error) {
                console.error(error);
            }
        }

        updateChallenger(
            navigate,
            data,
            setAlertSuccess,
            setFailureMessage,
            false
        );
    };


    // @ts-ignore
    return (
        <>
            <Section name="Profile" side="left" font={"font-sans"} image={"../assets/main-croc.png"}>


                <InputText
                    isValid={true}
                    placeholder="First Name"
                    value={data?.user?.first_name}
                    onChange={(e) => {
                        setData({
                            ...data,
                            user: {...data.user, first_name: e.target.value},
                        });
                    }}
                />
                <InputText
                    isValid={true}
                    placeholder="First Name Persian"
                    value={data?.first_name_persian}
                    onChange={(e) => {
                        setData({...data, first_name_persian: e.target.value});
                    }}
                />
                <InputText
                    isValid={true}
                    placeholder="Last Name"
                    value={data?.user?.last_name}
                    onChange={(e) => {
                        setData({
                            ...data,
                            user: {...data.user, last_name: e.target.value},
                        });
                    }}
                />
                <InputText
                    isValid={true}
                    placeholder="Last Name Persian"
                    value={data?.last_name_persian}
                    onChange={(e) => {
                        setData({...data, last_name_persian: e.target.value});
                    }}
                />
                <div className="flex flex-row">
                    <Input
                        type="text"
                        color="light-blue"
                        size="md"
                        placeholder="Email"
                        className="text-black"
                        crossOrigin=""
                        disabled
                        value={data?.user?.email}
                    />
                    <Button
                        color="light-blue"
                        size="md"
                        className={
                            "text-white h-11 " + (data?.is_confirmed ? "hidden" : "block")
                        }
                        onClick={() => confirmChallenger(navigate, setVerification, false)}
                    >
                        Verify
                    </Button>
                </div>
                <div
                    className={
                        "flex flex-row " +
                        (!data?.is_confirmed && verification ? "block" : "hidden")
                    }
                >
                    <Input
                        type="text"
                        color="light-blue"
                        size="md"
                        placeholder="Confirmation Code"
                        className="text-black"
                        crossOrigin=""
                        value={data?.confirmation_code}
                        onChange={(e) => {
                            setData({...data, confirmation_code: e.target.value});
                        }}
                    />
                    <Button
                        color="light-blue"
                        size="md"
                        className={"text-white h-11"}
                        onClick={() => verifyCode(navigate, data, setVerification, false)}
                    >
                        Check
                    </Button>
                </div>
                <Input
                    type="text"
                    color="light-blue"
                    size="md"
                    placeholder="Phone Number"
                    className="text-black"
                    crossOrigin=""
                    disabled
                    value={data?.phone_number}
                />
                <Textarea
                    color="light-blue"
                    size="md"
                    placeholder="Bio"
                    className="text-white"
                    value={data?.bio}
                    onChange={(e) => {
                        setData({...data, bio: e.target.value});
                    }}
                />
                <InputText
                    isValid={data?.university}
                    placeholder="University"
                    value={data?.university}
                    onChange={(e) => {
                        setData({...data, university: e.target.value});
                    }}
                />
                <InputText
                    isValid={data?.national_code}
                    placeholder="National Code"
                    value={data?.national_code}
                    onChange={(e) => {
                        setData({...data, national_code: e.target.value});
                    }}
                />
                <Select
                    label="Divison"
                    name="division"
                    value={data?.status}
                    className="text-white"
                    onChange={(value) => {
                        setData({...data, status: value});
                    }}
                >
                    <Option value="J">Junior</Option>
                    <Option value="S">Senior</Option>
                    <Option value="P">Pro</Option>
                </Select>
                <Select
                    label="Gender"
                    name="gender"
                    value={data?.gender}
                    onChange={(value) => {
                        setData({...data, gender: value});
                    }}
                    className="text-white"
                >
                    <Option value="M">Male</Option>
                    <Option value="F">Female</Option>
                </Select>

                <Select
                    label="T-Shirt Size"
                    name="shirt_size"
                    value={data?.shirt_size}
                    className="text-white"
                    onChange={(value) => {
                        setData({...data, shirt_size: value});
                    }}
                >
                    <Option value="M">Medium</Option>
                    <Option value="L">Large</Option>
                    <Option value="XL">X-Large</Option>
                    <Option value="XXL">XX-Large</Option>
                </Select>

                <Button
                    variant="gradient"
                    className={`flex h-10 items-center w-full justify-center gap-3 ${data.cv_file ? "text-green-400" : "text-gray-200"} outline mb-4`}
                    onClick={() => {
                        if (fileInputRef.current) {
                            fileInputRef.current.click()
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                    </svg>
                    {data.cv_file ? "CV Uploaded" : "Upload CV"}
                </Button>

                <input
                    ref={fileInputRef}
                    className="hidden"
                    id="cvfile"
                    type="file"
                    accept="application/pdf"
                    required={false}
                />


                <Button
                    variant="gradient"
                    type="submit"
                    className={`flex items-center w-full justify-center gap-3 text-gray-200 border-2 border-gray-200 mb-4`}
                    onClick={handleSubmit}

                >
                    {"Update Profile"}
                </Button>

                <Alert color="green" className="text-white" open={alertSuccess}>
                    Your profile is updated successfully!
                </Alert>
                <Alert color="red" className="text-white" open={failureMessage != ""}>
                    {failureMessage}
                </Alert>
            </Section>
        </>
    );
};

export default Profile;