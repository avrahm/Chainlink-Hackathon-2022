import { useState } from "react";
import { useWallet } from "../../context/WalletProvider";
import { Photo } from "../Photo";
import { EditProfile } from "./EditProfile";
import { TeamCard } from "./TeamCard";

export default function Profiles({ user, teams, isLoading = false, wallet, userObject }) {
    const { isAuthenticated, connectWallet, isAuthenticating } = useWallet();
    const [editProfileModal, toggleEditProfileModal] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="py-4">
                <h1>Player Profile</h1>
            </div>
            <div className="flex flex-col w-[480px] lg:w-[600px]">
                <div className="flex flex-col w-full justify-center items-center border-2 border-emerald-400 p-5">
                    <div className="flex flex-row my-4 w-full justify-center items-center">
                        <div className="flex flex-col w-1/2 items-center justify-center">
                            <Photo isLoading={isLoading} src={user.userPhoto} alt={user.userDisplayName} size="lg" type="profile" />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <span>{user.userDisplayName ? user.userDisplayName : "--"}</span>
                            <span>Member Since {user.createdAt ? user.createdAt.toLocaleDateString("en-US", { year: "numeric" }) : "--"}</span>
                        </div>
                    </div>
                    {wallet && <p> Wallet: {wallet}</p>}
                </div>
                <div className="w-full">
                    {wallet ? (
                        <button onClick={() => toggleEditProfileModal(true)} className="px-4 py-3 my-4 w-full bg-gray-200 rounded-full">
                            {user.newUser ? "Complete Profile" : "Edit Profile"}
                        </button>
                    ) : (
                        <>
                            {isAuthenticated && (
                                <button onClick={() => alert("Challenge")} className="px-4 py-3 my-4  w-full bg-green-200 rounded-full">
                                    Challenge Player
                                </button>
                            )}
                            {!isAuthenticated && (
                                <button
                                    disabled={isAuthenticating}
                                    className="rounded-full bg-green-200 px-4 py-3 my-4  w-full disabled:bg-gray-400"
                                    onClick={() => connectWallet(false)}
                                >
                                    Connect Wallet to Challenge
                                </button>
                            )}
                        </>
                    )}
                </div>
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
                        {isAuthenticated && (
                            <button
                                className="px-2 py-1 w-[120px] mx-4 bg-gray-200 rounded-full"
                                onClick={() => toggleManageTeamModal(!manageTeamModal)}
                            >
                                Create Team
                            </button>
                        )}
                    </div>
                    <div className="w-full">
                        {teams && !isLoading ? (
                            teams.length > 0 &&
                            teams.map((team, i) => {
                                return <TeamCard team={team.attributes} teamObject={team} key={i} leaveTeam={true} user={user} />;
                            })
                        ) : (
                            <h1>No Teams</h1>
                        )}
                    </div>
                </div>
            </div>

            <EditProfile user={user} toggleModal={toggleEditProfileModal} modalView={editProfileModal} userObject={userObject} />
        </div>
    );
}
