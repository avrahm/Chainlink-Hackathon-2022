import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { TeamsCard } from "../components/TeamCard";

export default function TeamsPage() {
    const [teams, setTeams] = useState([]);

    const { fetch, data, error, isLoading } = useMoralisQuery("teams", (query) => query.equalTo("active", true), [], {
        autoFetch: false,
    });

    useEffect(() => {
        fetch();

        return () => {
            // cleanup
        };
    }, []);

    return (
        <div className="mb-auto">
            <div className="flex flex-col justify-center items-center">
                <div className="py-4">
                    <h1>Teams Page</h1>
                </div>
                {data &&
                    data.map((team, i) => {
                        return <TeamsCard team={team.attributes} key={i} challengeTeam={true} />;
                    })}
            </div>
        </div>
    );
}
