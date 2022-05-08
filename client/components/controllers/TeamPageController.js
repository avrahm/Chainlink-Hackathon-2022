import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import TeamPage from "../views/TeamPage";

export const TeamPageController = ({ username, wallet = false }) => {
    const [teamData, setTeamData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [teamObject, setTeamObject] = useState({});

    const getTeamByUsername = useMoralisQuery("teams", (query) => query.equalTo("objectId", username), [], {
        autoFetch: false,
    });

    useEffect(() => {
        const teamIsLoading = getTeamByUsername.isLoading;
        setIsLoading(teamIsLoading);
    }, [getTeamByUsername]);

    useEffect(() => {
        const getTeam = getTeamByUsername.fetch();
        getTeam
            .then((team) => {
                setTeamData(team[0].attributes);
                setTeamObject(team[0]);
                setIsLoading(getTeamByUsername.isFetching);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    return <TeamPage team={teamData} teamIsLoading={isLoading} teamObject={teamObject} />;
};
