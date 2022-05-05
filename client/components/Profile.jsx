import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import Modal from "./Modal";
import { TeamsCard } from "./TeamCard";

export default function Profile({ wallet, user }) {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(user);
    const [teams, setTeams] = useState([]);

    const { fetch, data, error, isLoading } = useMoralisQuery("teams", (query) => query.contains("teamMembers", user.id), [], {
        autoFetch: false,
    });

    const getTeams = async () => {
        const teams = await fetch();
        setTeams(teams || []);
    };

    console.log(teams);

    useEffect(() => {
        if (user) {
            setUserData(user.attributes);
            getTeams();
        }
    }, [user]);

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
                        <div className="flex flex-col w-1/2 items-center justify-center">Picture</div>
                        <div className="flex flex-col w-1/2">
                            <span>{userData.displayName ? userData.displayName : "--"}</span>
                            <span>
                                Member Since {userData.createdAt ? userData.createdAt.toLocaleDateString("en-US", { year: "numeric" }) : "--"}
                            </span>
                        </div>
                    </div>
                    <p> Wallet: {userData.ethAddress}</p>
                </div>

                <button onClick={() => setOpen(true)} className="px-4 py-3 my-4 bg-gray-200 rounded-full">
                    {userData.IsNewUser ? "Complete Profile" : "Update Profile"}
                </button>

                <div className="flex flex-row my-4 justify-center items-start border-2 border-emerald-400 p-2">
                    <div className="flex flex-col w-1/2 items-center p-2">
                        <div className="flex flex-col justify-center items-center">
                            <span className="p-2 font-bold">Record:</span>
                            <span>
                                {userData.wins} Wins - {userData.losses} Losses
                            </span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="p-2 font-bold">Winnings:</span>
                            <span>{userData.winnings} VYBES</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 items-center p-2">
                        <div className="flex flex-col justify-center items-center">
                            <span className="p-2 font-bold">Sportsmanship:</span>
                            <span>{userData.pos ? `${userData.pos}% ` : "100%"}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="p-2 font-bold">Sport Preferences:</span>
                            <ul>
                                {userData.sportsPreferences &&
                                    userData.sportsPreferences.map((sport, i) => {
                                        return <li key={i}>{sport.toUpperCase()}</li>;
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col my-4 justify-around items-center border-2 border-emerald-400 p-2">
                    <div className="flex flex-col justify-around items-center">
                        <div className="flex flex-row w-1/2 justify-center  items-center">
                            <h1>Team(s) </h1>
                            <button className="px-2 py-1 w-[120px] mx-4 bg-gray-200 rounded-full">Create Team</button>
                        </div>
                        {teams &&
                            !isLoading &&
                            teams.map((team, i) => {
                                return <TeamsCard team={team.attributes} key={i} leaveTeam={true} />;
                            })}
                    </div>
                </div>
            </div>

            <div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <EditProfile user={userData} />
                </Modal>
            </div>
        </div>
    );
}

const EditProfile = ({ user }) => {
    const [editDisplayName, setEditDisplayName] = useState("");
    const [editSportsPreferences, setEditSportsPreferences] = useState("");

    useEffect(() => {
        if (user) {
            setEditDisplayName(user.displayName);
            setEditSportsPreferences(user.sportsPreferences);
        }
    }, [user]);

    return (
        <div className="flex flex-col border-2 border-green-100 p-4 items-center">
            <div>Edit Profile</div>

            {user.IsNewUser && <span className="py-2">Please complete profile:</span>}

            <div className="p-2">
                <span>Display Name:</span>
                <input value={editDisplayName} className="mx-3 px-2 py-1 rounded bg-gray-300" onChange={(e) => setEditDisplayName(e)} />
            </div>

            <div className="p-2">
                <span>Sports Preferences:</span>
                <input value={editSportsPreferences} className="mx-3 px-2 py-1 rounded bg-gray-300" onChange={(e) => setEditSportsPreferences(e)} />
            </div>

            {/* <div className="p-2">
                <span>Picture:</span> <input type="file" className="mx-3 px-2 py-1 rounded bg-gray-300" />
            </div> */}
            <button className="my-3 px-2 py-1 bg-green-300 rounded-full">Save</button>
        </div>
    );
};
