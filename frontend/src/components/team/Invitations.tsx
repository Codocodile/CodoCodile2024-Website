import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChallengerTeam } from "./TeamList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, urls } from "../../global-constants/Variables";
import { RefreshToken } from "../panel/Panel";

export interface Invitation {
  id: number;
  group: ChallengerTeam;
}

interface Props {
  invitations: Invitation[];
  setTeam: React.Dispatch<ChallengerTeam>;
  loadTeam: (
    setTeam: React.Dispatch<ChallengerTeam>,
    navigate: any,
    is_crashed: boolean
  ) => void;
  setInvitations: React.Dispatch<Invitation[]>;
  setFailureMessage: React.Dispatch<React.SetStateAction<string>>;
}

function respondInvitation(
  id: number,
  setTeam: React.Dispatch<ChallengerTeam>,
  loadTeam: (
    setTeam: React.Dispatch<ChallengerTeam>,
    navigate: any,
    is_crashed: boolean
  ) => void,
  invitations: Invitation[],
  setInvitations: React.Dispatch<Invitation[]>,
  status: string,
  navigate: any,
  setFailureMessage: React.Dispatch<React.SetStateAction<string>>
) {
  axios
    .put(
      API_URL + "/api/accept-invitation/",
      {
        id: id,
        status: status,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth.access"),
        },
      }
    )
    .then(() => {
      if (status == "A") {
        loadTeam(setTeam, navigate, false);
      } else {
        setInvitations(
          invitations.filter((invitation) => invitation.id !== id)
        );
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        if (!RefreshToken()) {
          navigate(urls.signIn);
          return;
        }
        respondInvitation(
          id,
          setTeam,
          loadTeam,
          invitations,
          setInvitations,
          status,
          navigate,
          setFailureMessage
        );
      } else {
        setFailureMessage(err.response.data.errors[0].detail);
        setTimeout(() => {
          setFailureMessage("");
        }, 3000);
      }
    });
}

const TeamList = ({
  invitations,
  loadTeam,
  setTeam,
  setInvitations,
  setFailureMessage,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Card className="mt-2">
      {invitations.length > 0 && (
        <List>
          {invitations.map((invitation) => (
            <ListItem
              key={invitation.id}
              ripple={false}
              className="py-1 pr-1 pl-4"
            >
              <div className="flex flex-col">
                <span className="text-lg">{invitation.group.name}</span>
              </div>
              <ListItemSuffix>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={() => {
                    respondInvitation(
                      invitation.id,
                      setTeam,
                      loadTeam,
                      invitations,
                      setInvitations,
                      "A",
                      navigate,
                      setFailureMessage
                    );
                  }}
                >
                  <CheckIcon strokeWidth={2} className="h-6 w-6" />
                </IconButton>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={() => {
                    respondInvitation(
                      invitation.id,
                      setTeam,
                      loadTeam,
                      invitations,
                      setInvitations,
                      "R",
                      navigate,
                      setFailureMessage
                    );
                  }}
                >
                  <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

export default TeamList;
