import { useEffect } from "react";
import { useMoralisQuery } from "react-moralis";
import { TeamsCard } from "../components/views/TeamCard";

export default function TeamsPage() {
    const { fetch, data, error, isLoading } = useMoralisQuery("teams", (query) => query.equalTo("active", true), [], {
        autoFetch: false,
    });

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className="mb-auto">
            <div className="flex flex-col justify-center items-center">
                <div className="py-4">
                    <h1>Teams Page</h1>
                </div>
                {data &&
                    !isLoading &&
                    data.length > 0 &&
                    data.map((team, i) => {
                        return <TeamsCard team={team.attributes} key={i} challengeTeam={true} />;
                    })}
            </div>
        </div>
    );
}
