import { useEffect } from "react";
import { useMoralisQuery } from "react-moralis";
import Teams from "../views/Teams";

export const TeamsController = () => {
    const { fetch, data, error, isLoading } = useMoralisQuery("teams", (query) => query.equalTo("isTeamActive", true), [], {
        autoFetch: true,
    });

    useEffect(() => {
        fetch();
    }, []);
    return <Teams data={data} isLoading={isLoading} />;
};
