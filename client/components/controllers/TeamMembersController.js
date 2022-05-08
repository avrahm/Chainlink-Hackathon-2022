import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { TeamMember } from "../views/TeamMember";

export const TeamMembersController = ({ members, team, teamIsLoading, wallet = false }) => {
    const [teamMembers, setTeamsMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTeamMembers = useMoralisQuery("users", (query) => query.containedIn("username", members), [], {
        autoFetch: false,
    });

    useEffect(() => {
        const isLoadingMembers = fetchTeamMembers.isLoading;
        setIsLoading(isLoadingMembers);
    }, [fetchTeamMembers]);

    useEffect(() => {
        const getTeamMembers = fetchTeamMembers.fetch();
        getTeamMembers
            .then((members) => {
                setTeamsMembers(members);
                setIsLoading(getTeamMembers.isLoading);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, [teamIsLoading]);

    return (
        <div>
            {teamMembers &&
                teamMembers.map((member, i) => {
                    return <TeamMember key={i} member={member.attributes} isLoadingMembers={isLoading} memberObject={member} team={team} />;
                })}
        </div>
    );
};
