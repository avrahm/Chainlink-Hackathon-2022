export const TeamsCard = ({ team, leaveTeam = false, challengeTeam = false }) => {
    return (
        <div className="flex flex-row my-4 w-full justify-center items-start border-2 border-emerald-400 p-2">
            <div className="flex flex-col w-full items-center justify-center p-2">
                <span className="p-2 font-bold">Team Name:</span>
                <span> {team.teamName}</span>
                <span className="p-2 font-bold">Description:</span>
                <span> {team.teamDescription}</span>

                {challengeTeam && <button className="px-2 py-1 my-4 bg-green-200 rounded-full">Challenge</button>}

                {leaveTeam && <button className="px-2 py-1 my-4 bg-red-200 rounded-full">Leave Team</button>}
            </div>
            <div className="flex flex-col w-full items-center p-2">
                <div className="flex flex-col justify-center items-center">
                    <span className="p-2 font-bold">Record:</span>
                    <span>
                        {team.teamWins} Wins - {team.teamLosses} Losses
                    </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="p-2 font-bold">Winnings:</span>
                    <span>{team.teamWinnings} VYBES</span>
                </div>
            </div>
            <div className="flex flex-col w-full items-center p-2">
                <div className="flex flex-col justify-center items-center">
                    <span className="p-2 font-bold">Sportsmanship:</span>
                    <span>{team.teamPOS ? `${team.teamPOS}% ` : "100%"}</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="p-2 font-bold">Sport Preferences:</span>
                    <ul>
                        {team.teamSportsPreferences &&
                            team.teamSportsPreferences.map((sport, i) => {
                                return <li key={i}>{sport.toUpperCase()}</li>;
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
