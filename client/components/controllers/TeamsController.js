import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import Teams from "../views/Teams";
import TeamsFilter from "../views/TeamsFilter";

export const TeamsController = () => {
    const [data, setData] = useState([]);
    const [cloneData, setCloneData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getTeams = useMoralisQuery("teams", (query) => query.equalTo("isTeamActive", true), [], {
        autoFetch: true,
    });

    const filterTeams = (filterBy, filterValue) => {
        console.log(filterBy, filterValue);
        if (filterBy === "all") {
            setData(getTeams.data);
            return true;
        }
        const filteredTeams = data.filter((team) => {
            if (filterBy === "teamPOS") {
                return team.attributes.teamPOS > filterValue;
            }
            if (filterBy === "sport") {
                return team.attributes.teamSportsPreferences.includes(filterValue);
            }
        });
        setCloneData(filteredTeams);
        return true;
    };

    useEffect(() => {
        getTeams.fetch();
        setData(getTeams.data);
        setCloneData(getTeams.data);
        setIsLoading(getTeams.isLoading);
    }, [getTeams.isLoading]);

    return (
        <>
            <TeamsFilter filterTeams={filterTeams} isLoading={isLoading} />
            <Teams data={cloneData} isLoading={isLoading} />
        </>
    );
};
