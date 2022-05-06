import Image from "next/image";
import { useState } from "react";
import { EditProfile } from "./EditProfile";
import { TeamsCard } from "./TeamCard";

export default function Profiles({ user, teams, isLoading, wallet }) {
    const [editProfileModal, toggleEditProfileModal] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="py-4">
                <h1>Player Profile</h1>
            </div>

            {/* 
                !ToDo: finish 
                Challenge button (private - player page only)
                List of events (private - events page)
                List of teams (private - teams page)
                Winnings (private: Total - private: Range)
            */}
            <div className="flex flex-col w-full">
                {/* profile card */}
                <div className="flex flex-col w-full justify-center items-center border-2 border-emerald-400 p-5">
                    <div className="flex flex-row my-4 w-full justify-center items-center">
                        <div className="flex flex-col w-1/2 items-center justify-center">
                            <div className="max-w-[120px]">
                                {user.userPhoto ? (
                                    <Image src={user.userPhoto} alt="SportsVybe Logo" height={200} width={160} priority />
                                ) : (
                                    <Image src="/images/profile_placeholder.png" alt="SportsVybe Logo" width={160} height={160} priority />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <span>{user.userDisplayName ? user.userDisplayName : "--"}</span>
                            <span>Member Since {user.createdAt ? user.createdAt.toLocaleDateString("en-US", { year: "numeric" }) : "--"}</span>
                        </div>
                    </div>
                    {wallet && <p> Wallet: {wallet}</p>}
                </div>
                {wallet ? (
                    <button onClick={() => toggleEditProfileModal(true)} className="px-4 py-3 my-4 bg-gray-200 rounded-full">
                        {user.userStatus || user.userStatus == undefined ? "Complete Profile" : "Edit Profile"}
                    </button>
                ) : (
                    <button onClick={() => alert("Challenge")} className="px-4 py-3 my-4 bg-gray-200 rounded-full">
                        Challenge User
                    </button>
                )}

                <div className="flex flex-row my-4 justify-center items-start border-2 border-emerald-400 p-2">
                    <div className="flex flex-col w-1/2 items-center p-2">
                        <div className="flex flex-col justify-center items-center">
                            <span className="p-2 font-bold">Record:</span>
                            <span>
                                {user.userWins} Wins - {user.userLosses} Losses
                            </span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="p-2 font-bold">Winnings:</span>
                            <span>{user.userWinnings} VYBES</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 items-center p-2">
                        <div className="flex flex-col justify-center items-center">
                            <span className="p-2 font-bold">Sportsmanship:</span>
                            <span>{user.userPOS ? `${user.userPOS}% ` : "100%"}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="p-2 font-bold">Sport Preferences:</span>
                            <ul>
                                {user.userSportsPreferences &&
                                    user.userSportsPreferences.map((sport, i) => {
                                        return <li key={i}>{sport.toUpperCase()}</li>;
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col my-4 w-full justify-around items-center border-2 border-emerald-400 p-2">
                    <div className="flex flex-row w-full justify-center py-3 items-center">
                        <h1>Team(s) </h1>
                        <button className="px-2 py-1 w-[120px] mx-4 bg-gray-200 rounded-full">Create Team</button>
                    </div>
                    {teams && isLoading ? (
                        teams.map((team, i) => {
                            return <TeamsCard team={team.attributes} key={i} leaveTeam={true} />;
                        })
                    ) : (
                        <h1>No Teams</h1>
                    )}
                </div>
            </div>

            <div>
                <EditProfile user={user} toggleModal={toggleEditProfileModal} modalView={editProfileModal} />
                {/* <EditProfile user={user} toggleModal={toggleEditProfileModal} modalView={editProfileModal} /> */}
            </div>
        </div>
    );
}