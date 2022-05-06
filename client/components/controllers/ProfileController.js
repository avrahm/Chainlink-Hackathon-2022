import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import Profile from "../views/Profile";

export const ProfileController = ({ username, wallet = false }) => {
    const [userData, setUserData] = useState({});
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUserByUsername = useMoralisQuery("users", (query) => query.equalTo("username", username), [], {
        autoFetch: false,
    });

    const getTeamsByUsername = useMoralisQuery("teams", (query) => query.contains("teamMembers", username), [], {
        autoFetch: false,
    });

    useEffect(() => {
        const userLoading = getUserByUsername.isLoading;
        const teamsLoading = getTeamsByUsername.isLoading;
        setIsLoading(!userLoading || !teamsLoading);
    }, [getUserByUsername, getTeamsByUsername]);

    useEffect(() => {
        const getUser = getUserByUsername.fetch();
        getUser
            .then((user) => {
                setUserData(user[0].attributes);
            })
            .then(() => {
                const getTeams = getTeamsByUsername.fetch();
                getTeams.then((teams) => {
                    setTeams(teams);
                });
            });
    }, [username]);

    return <Profile user={userData} teams={teams} isLoading={isLoading} wallet={wallet} />;
};
