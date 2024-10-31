import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import { UserPlusIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { API_URL, urls } from "../../global-constants/Variables";
import { RefreshToken } from "../panel/Panel";

export interface User {
  first_name: string;
  last_name: string;
}

export interface Challenger {
  id: number;
  first_name_persian: string;
  last_name_persian: string;
  university: string;
  status: string;
  national_code: string;
  is_confirmed: boolean;
  user: User;
}

export interface Member {
  status: string;
  role: string;
  challenger: Challenger;
}

export interface ChallengerTeam {
  id: number;
  name: string;
  description: string;
  judge_username: string;
  judge_password: string;
  members: Member[];
}

export interface Invitation {
  id: number;
  group: ChallengerTeam;
}

interface Props {
  users: Challenger[];
  team?: ChallengerTeam;
  setTeam?: React.Dispatch<any>;
  type: "members" | "challengers";
  setSearchFailureMessage?: React.Dispatch<React.SetStateAction<string>>;
}

function createTeam(
  setTeam: React.Dispatch<any>,
  navigate: NavigateFunction,
  setSearchFailureMessage: React.Dispatch<React.SetStateAction<string>>,
  is_crashed: boolean
) {
  axios
    .post(
      API_URL + "/api/team/",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth.access"),
        },
      }
    )
    .then((res) => {
      setTeam(res.data);
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
        createTeam(setTeam, navigate, setSearchFailureMessage, true);
      } else {
        setSearchFailureMessage(err.response.data.errors[0].detail);
        setTimeout(() => {
          setSearchFailureMessage("");
        }, 3000);
      }
    });
}

function inviteMember(
  setTeam: React.Dispatch<any>,
  navigate: NavigateFunction,
  setSearchFailureMessage: React.Dispatch<React.SetStateAction<string>>,
  is_crashed: boolean,
  id: number
) {
  axios
    .post(
      API_URL + "/api/invitation/",
      {
        challenger: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth.access"),
        },
      }
    )
    .then((res) => {
      setTeam(res.data.group);
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
        inviteMember(setTeam, navigate,setSearchFailureMessage, true, id);
      } else {
        setSearchFailureMessage(err.response.data.errors[0].detail);
        setTimeout(() => {
          setSearchFailureMessage("");
        }, 3000);
      }
    });
}

const TeamList = ({
  users,
  team,
  setTeam,
  type,
  setSearchFailureMessage,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Card className="mt-2">
      {users.length > 0 && (
        <List>
          {users.map((user) => (
            <ListItem key={user.id} ripple={false} className="py-1 pr-1 pl-4">
              <div className="flex flex-col">
                <span className="text-lg">
                  {user.first_name_persian} {user.last_name_persian}
                </span>
                <span className="text-md">
                  {user.user.first_name} {user.user.last_name}
                </span>
                <span className="text-sm text-blue-gray-400">
                  {user.university}
                </span>
              </div>
              <ListItemSuffix>
                <Tooltip
                  content={
                    (user.status == "J" && "Junior") ||
                    (user.status == "S" && "Senior") ||
                    (user.status == "P" && "Professional")
                  }
                >
                  <div className="flex flex-row">
                    <StarIcon strokeWidth={2} className="h-4 w-4" />
                    {(user.status === "S" || user.status === "P") && (
                      <StarIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                    {user.status === "P" && (
                      <StarIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </div>
                </Tooltip>
                {type !== "members" && (
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => {
                      if (team?.members.length == 0) {
                        createTeam(
                          setTeam!,
                          navigate,
                          setSearchFailureMessage!,
                          false
                        );
                        setTimeout(() => {
                          inviteMember(setTeam!, navigate, setSearchFailureMessage!, false, user.id);
                        }, 3000);
                      } else {
                        inviteMember(setTeam!, navigate, setSearchFailureMessage!, false, user.id);
                      }
                    }}
                  >
                    <UserPlusIcon strokeWidth={2} className="h-6 w-6" />
                  </IconButton>
                )}
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

export default TeamList;
