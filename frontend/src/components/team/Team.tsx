import axios from "axios";
import {Section} from "../../containers";
import {
    Alert,
    Button,
    Input,
    Textarea,
    // Typography,
} from "@material-tailwind/react";
import {API_URL, urls} from "../../global-constants/Variables";
import React, {useEffect, useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {RefreshToken} from "../panel/Panel";
import TeamList, {Challenger, ChallengerTeam, Invitation} from "./TeamList";
import "./TeamPagination";
import TeamPagination from "./TeamPagination";
import InputText from "../profile/InputText";
import Invitations from "./Invitations";
import {ClipboardCopyButton} from "../clipboardCopyButton/ClipboardCopyButton.tsx";

let timer: number;

function debouncedSearchChallenger(
    name: string,
    navigate: NavigateFunction,
    page: number,
    setUsers: React.Dispatch<React.SetStateAction<never[]>>,
    setTotalPages: React.Dispatch<React.SetStateAction<number>>,
    is_crashed: boolean
) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        searchChallenger(name, navigate, page, setUsers, setTotalPages, is_crashed);
    }, 500);
}

function searchChallenger(
    name: string,
    navigate: NavigateFunction,
    page: number,
    setUsers: React.Dispatch<React.SetStateAction<never[]>>,
    setTotalPages: React.Dispatch<React.SetStateAction<number>>,
    is_crashed: boolean
) {
    if (name.length < 3) {
        setUsers([]);
        setTotalPages(1);
        return;
    }
    axios
        .get(API_URL + "/api/search-challenger/?name=" + name + "&page=" + page, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth.access"),
            },
        })
        .then((res) => {
            setUsers(res.data.results);
            setTotalPages(Math.ceil(res.data.count / 10));
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
                searchChallenger(name, navigate, page, setUsers, setTotalPages, true);
            }
        });
}

function loadTeam(
    setTeam: React.Dispatch<ChallengerTeam>,
    navigate: NavigateFunction,
    is_crashed: boolean
) {
    axios
        .get(API_URL + "/api/team/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth.access"),
            },
        })
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
                loadTeam(setTeam, navigate, true);
            }
        });
}

function loadInvitations(
    setInvitations: React.Dispatch<Invitation[]>,
    navigate: NavigateFunction,
    page: number,
    is_crashed: boolean
) {
    axios
        .get(API_URL + "/api/invitation/?page=" + page, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth.access"),
            },
        })
        .then((res) => {
            setInvitations(res.data.results);
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
                loadInvitations(setInvitations, navigate, page, true);
            }
        });
}

function updateTeam(
    setTeam: React.Dispatch<ChallengerTeam>,
    navigate: NavigateFunction,
    is_crashed: boolean,
    team: ChallengerTeam
) {
    axios
        .put(
            API_URL + "/api/team/",
            {
                name: team.name,
                description: team.description,
            },
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
                updateTeam(setTeam, navigate, true, team);
            }
        });
}

function deleteTeam(
    setTeam: React.Dispatch<ChallengerTeam>,
    navigate: NavigateFunction,
    is_crashed: boolean
) {
    axios
        .delete(API_URL + "/api/team/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth.access"),
            },
        })
        .then(() => {
            setTeam({
                id: 0,
                name: "",
                description: "",
                judge_password: "",
                judge_username: "",
                members: [],
            });
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
                deleteTeam(setTeam, navigate, true);
            }
        });
}

function loadChallenger(
    navigate: NavigateFunction,
    setChallenger: React.Dispatch<any>,
    is_crashed: boolean
) {
    axios
        .get(API_URL + "/api/view-challenger/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth.access"),
            },
        })
        .then((res) => {
            setChallenger(res.data);
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
                loadChallenger(navigate, setChallenger, true);
            }
        });
}

const Team = () => {
    const navigate = useNavigate();
    const [team, setTeam] = useState<ChallengerTeam>({
        id: 0,
        name: "",
        description: "",
        judge_password: "",
        judge_username: "",
        members: [],
    });
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [failureMessage, setFailureMessage] = useState("");
    const [searchFailureMessage, setSearchFailureMessage] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    // const [division, setDivision] = useState("");
    const [challenger, setChallenger] = useState<Challenger>({
        id: 0,
        first_name_persian: "",
        last_name_persian: "",
        university: "",
        status: "",
        national_code: "",
        is_confirmed: false,
        user: {
            first_name: "",
            last_name: "",
        },
    });

    useEffect(() => {
        loadChallenger(navigate, setChallenger, false);
        loadTeam(setTeam, navigate, false);
        loadInvitations(setInvitations, navigate, 1, false);
    }, []);

    useEffect(() => {
        let max_division = "J";
        for (const member of team.members) {
            if (max_division == "J" && member.challenger.status != "J") {
                max_division = member.challenger.status;
            } else if (max_division == "S" && member.challenger.status == "P") {
                max_division = member.challenger.status;
            }
        }
        // setDivision(max_division);
    }, [team]);

    return (
        <>
            {team.members.length > 0 ? (
                <Section image={"../assets/crocs/croc-invite.png"} name="Team" side="left" font={"font-sans"}>
                    <InputText
                        isValid={true}
                        value={team.name}
                        placeholder={"Team Name"}
                        onChange={(e) => {
                            setTeam({...team, name: e.target.value});
                        }}
                    />

                    <div className={"flex flex-col justify-start my-4 gap-2"}>
                        <ClipboardCopyButton key={"judgeUsername"} title={"Judge Username:"}
                                             text={team.judge_username}></ClipboardCopyButton>
                        <ClipboardCopyButton key={"judgePassword"} title={"Judge Password:"}
                                             text={team.judge_password}></ClipboardCopyButton>
                    </div>


                    <Textarea
                        label={"Description"}
                        color="light-blue"
                        size="md"
                        // placeholder="Description"
                        className="text-white"
                        value={team.description}
                        onChange={(e) => {
                            setTeam({...team, description: e.target.value});
                        }}
                    />

                    <TeamList
                        users={team.members.map((m) => m.challenger)}
                        type="members"
                    />


                    <div className="flex flex-row gap-2 mt-2">

                        <Button
                            variant={"gradient"}
                            onClick={() => {
                                updateTeam(setTeam, navigate, false, team);
                            }}
                        >
                            Update
                        </Button>

                        {/*<Button*/}
                        {/*    color="red"*/}
                        {/*    onClick={() => {*/}
                        {/*        deleteTeam(setTeam, navigate, false);*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    Delete/Leave*/}
                        {/*</Button>*/}
                        <Button
                            color="green"
                            fullWidth={true}
                            onClick={() => {
                                window.open("https://judge.codocodile.ir/login", "_blank");
                            }}
                        >
                            <span>go to online Judge</span>
                        </Button>

                    </div>
                </Section>
            ) : (
                <>
                    <Section image={"../assets/crocs/croc-invite.png"} name="Invitations" side="left"
                             font={"font-sans"}>
                        <Alert
                            open={
                                failureMessage != "" ||
                                challenger.national_code == "" ||
                                !challenger.is_confirmed
                            }
                            color="red"
                        >
                            {challenger.national_code == "" && (
                                <p className="text-md">Please complete your profile</p>
                            )}
                            {!challenger.is_confirmed && (
                                <p className="text-md">Please confirm your email</p>
                            )}
                            <p className="text-sm">{failureMessage}</p>
                        </Alert>
                        {challenger.national_code != "" && challenger.is_confirmed && (
                            <Invitations
                                invitations={invitations}
                                setInvitations={setInvitations}
                                setTeam={setTeam}
                                loadTeam={loadTeam}
                                setFailureMessage={setFailureMessage}
                            />
                        )}
                    </Section>
                </>
            )}
            {/*{team.members.length < 2 && (*/}
            {/*    <Section image={"../assets/crocs/croc-teams.png"} name="Challengers" side="right" font={"font-sans"}>*/}
            {/*        <Alert open={searchFailureMessage != ""} color="red">*/}
            {/*            {searchFailureMessage}*/}
            {/*        </Alert>*/}
            {/*        {challenger.national_code != "" && challenger.is_confirmed && (*/}
            {/*            <>*/}
            {/*                <Input*/}
            {/*                    type="text"*/}
            {/*                    color="light-blue"*/}
            {/*                    placeholder="Name"*/}
            {/*                    crossOrigin=""*/}
            {/*                    className="text-white"*/}
            {/*                    onChange={(e) => {*/}
            {/*                        setName(e.target.value);*/}
            {/*                        debouncedSearchChallenger(*/}
            {/*                            e.target.value,*/}
            {/*                            navigate,*/}
            {/*                            1,*/}
            {/*                            setUsers,*/}
            {/*                            setTotalPages,*/}
            {/*                            false*/}
            {/*                        );*/}
            {/*                    }}*/}
            {/*                    value={name}*/}
            {/*                />*/}
            {/*                <TeamList*/}
            {/*                    users={users}*/}
            {/*                    team={team}*/}
            {/*                    setTeam={setTeam}*/}
            {/*                    setSearchFailureMessage={setSearchFailureMessage}*/}
            {/*                    type="challengers"*/}
            {/*                />*/}
            {/*                <TeamPagination*/}
            {/*                    pager={(nextPage) => {*/}
            {/*                        debouncedSearchChallenger(*/}
            {/*                            name,*/}
            {/*                            navigate,*/}
            {/*                            nextPage,*/}
            {/*                            setUsers,*/}
            {/*                            setTotalPages,*/}
            {/*                            false*/}
            {/*                        );*/}
            {/*                    }}*/}
            {/*                    totalPages={totalPages}*/}
            {/*                />*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </Section>*/}
            {/*)}*/}
        </>
    );
};

export default Team;
