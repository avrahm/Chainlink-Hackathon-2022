import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import Profile from "../views/Profile";

export const ProfileController = ({ username, wallet = false }) => {
    const router = useRouter();
    const newUser = {
        username: username,
        userWins: 0,
        userWinnings: 0,
        userLosses: 0,
        userStatus: 0,
        newUser: true,
        userPOS: 0,
    };

    const [userData, setUserData] = useState({});
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userObject, setUserObject] = useState({});
    const createNewUser = useNewMoralisObject("users");

    const getUserByUsername = useMoralisQuery("users", (query) => query.equalTo("username", username).limit(1), [], {
        autoFetch: false,
    });

    const getTeamsByUsername = useMoralisQuery("teams", (query) => query.contains("teamMembers", username), [], {
        autoFetch: false,
    });

    useEffect(() => {
        const userLoading = getUserByUsername.isLoading;
        const teamsLoading = getTeamsByUsername.isLoading;
        setIsLoading(userLoading || teamsLoading);
    }, [getUserByUsername, getTeamsByUsername]);

    useEffect(() => {
        const getUser = getUserByUsername.fetch();
        getUser
            .then((user) => {
                if (user.length == 0) {
                    createNewUser.save(newUser, {
                        onSuccess: (user) => {
                            setUserObject(user.attributes);
                            router.reload();
                        },
                    });
                } else {
                    setUserData(user[0].attributes);
                    setUserObject(user[0]);
                    const getTeams = getTeamsByUsername.fetch();
                    getTeams.then((teams) => {
                        setTeams(teams);
                    });
                }
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    return <Profile user={userData} teams={teams} isLoading={isLoading} wallet={wallet} userObject={userObject} />;
};
