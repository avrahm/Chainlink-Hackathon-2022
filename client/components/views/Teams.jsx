import { TeamCard } from "./TeamCard";

export default function Teams({ data, isLoading }) {
    return (
        <div className="flex flex-col w-[480px] lg:w-[600px]">
            {data &&
                !isLoading &&
                data.length > 0 &&
                data.map((team, i) => {
                    return <TeamCard team={team.attributes} teamObject={team} key={i} challengeTeam={true} />;
                })}
        </div>
    );
}
