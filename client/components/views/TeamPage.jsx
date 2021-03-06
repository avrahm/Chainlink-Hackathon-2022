import { useState } from "react";
import { useWallet } from "../../context/WalletProvider";
import { TeamMembersController } from "../controllers/TeamMembersController";
import { Photo } from "../Photo";
import { ManageChallenge } from "./ChallengeModal";

export default function TeamPage({ team, teamIsLoading, wallet, teamObject }) {
    const { user, isAuthenticating, connectWallet } = useWallet();
    const [manageChallengeModal, toggleManageChallengeModal] = useState(false);

    let isTeamMember = false;
    let isAdmin = false;

    if (user) {
        const { username } = user.attributes ? user.attributes : "";
        isTeamMember = (user && team.teamMembers && team.teamMembers.find((member) => member === username)) || false;
        isAdmin = team.teamAdmin === username || false;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="py-4">
                <h1>Team Profiles</h1>
            </div>
            <div className="flex flex-col w-[480px] lg:w-[600px]">
                <div className="flex flex-col w-full justify-center items-center border-2 border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out p-5">
                    <div className="flex flex-row my-4 w-full justify-center items-center">
                        <div className="flex flex-col w-1/2 items-center justify-center">
                            <Photo src={team.teamPhoto} alt={team.teamName} size="lg" type="team" isLoading={teamIsLoading} />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <span>{team.teamName ? team.teamName : "--"}</span>
                            <span>
                                Member Since{" "}
                                {team.createdAt
                                    ? team.createdAt.toLocaleDateString("en-US", {
                                          year: "numeric",
                                      })
                                    : "--"}
                            </span>
                            <span>{team.teamDescription}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    {user && !isTeamMember && (
                        <button
                            onClick={() => toggleManageChallengeModal(!manageChallengeModal)}
                            className="px-4 py-3 my-4  w-full bg-green-200 rounded-full hover:bg-green-400"
                        >
                            Challenge Team
                        </button>
                    )}
                    {user && isTeamMember && <button className="px-4 py-3 my-4  w-full bg-red-200 rounded-full">Leave Team</button>}
                    {!user && (
                        <button
                            disabled={isAuthenticating}
                            className="rounded-full bg-green-200 px-4 py-3 my-4  w-full disabled:bg-gray-400 hover:bg-green-400 "
                            onClick={() => connectWallet(false)}
                        >
                            Connect Wallet to Challenge
                        </button>
                    )}
                </div>
                <div className="flex flex-row my-4 justify-center items-start border-2 border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out p-2">
                    <div className="flex flex-col w-1/2 items-center p-2">
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
                    <div className="flex flex-col w-1/2 items-center p-2">
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

                <div className="flex flex-col my-4 w-full justify-around items-center border-2 border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out p-2">
                    <div className="flex flex-col w-full justify-center py-3 items-center">
                        <h1>Members </h1>
                        {!teamIsLoading && <TeamMembersController members={team.teamMembers} team={team} teamIsLoading={teamIsLoading} />}
                    </div>
                </div>
            </div>
            {user && !isTeamMember && (
                <ManageChallenge
                    user={user}
                    team={team}
                    challengeTeamId={team.teamChainId}
                    toggleModal={toggleManageChallengeModal}
                    modalView={manageChallengeModal}
                    createNewChallenge={true}
                />
            )}
        </div>
    );
}
