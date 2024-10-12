import React, { useEffect, useState } from "react";
import { Section } from "../../containers";
import axios from "axios";
import { RefreshToken } from "../panel/Panel";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { urls, API_URL } from "../../global-constants/Variables";
import {
  Checkbox,
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
      { confirmation_code: data.confirmation_code },
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
  return (
    <>
      <Section name="Profile" side="left">
        <InputText
          placeholder="First Name"
          value={data?.user?.first_name}
          onChange={(e) => {
            setData({
              ...data,
              user: { ...data.user, first_name: e.target.value },
            });
          }}
        />
        <InputText
          placeholder="First Name Persian"
          value={data?.first_name_persian}
          onChange={(e) => {
            setData({ ...data, first_name_persian: e.target.value });
          }}
        />
        <InputText
          placeholder="Last Name"
          value={data?.user?.last_name}
          onChange={(e) => {
            setData({
              ...data,
              user: { ...data.user, last_name: e.target.value },
            });
          }}
        />
        <InputText
          placeholder="Last Name Persian"
          value={data?.last_name_persian}
          onChange={(e) => {
            setData({ ...data, last_name_persian: e.target.value });
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
              setData({ ...data, confirmation_code: e.target.value });
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
            setData({ ...data, bio: e.target.value });
          }}
        />
        <InputText
          placeholder="University"
          value={data?.university}
          onChange={(e) => {
            setData({ ...data, university: e.target.value });
          }}
        />
        <InputText
          placeholder="National Code"
          value={data?.national_code}
          onChange={(e) => {
            setData({ ...data, national_code: e.target.value });
          }}
        />
        <Select
          label="Divison"
          name="division"
          value={data?.status}
          className="text-white"
          onChange={(value) => {
            setData({ ...data, status: value });
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
            setData({ ...data, gender: value });
          }}
          className="text-white"
        >
          <Option value="M">Male</Option>
          <Option value="F">Female</Option>
        </Select>
        <Checkbox
          color="light-blue"
          label="Is Workshop attendee"
          checked={data?.is_workshop_attender}
          onChange={(e) => {
            setData({ ...data, is_workshop_attender: e.target.checked });
          }}
          crossOrigin=""
          className="text-white"
        />
        <Input
          type="submit"
          value="Update"
          color="light-blue"
          size="lg"
          className="text-white"
          crossOrigin=""
          onClick={(e) => {
            e.preventDefault();
            updateChallenger(
              navigate,
              data,
              setAlertSuccess,
              setFailureMessage,
              false
            );
          }}
        />
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
