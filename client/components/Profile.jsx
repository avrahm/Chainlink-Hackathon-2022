import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function Profile({ wallet, user }) {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(user);

    useEffect(() => {
        if (user) {
            const { attributes } = user;
            setUserData(attributes);
        }
    }, [user]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Player Profile</h1>

            {/* 
                !ToDo: finish 
                Challenge button (private - player page only)
                List of events (private - events page)
                List of teams (private - teams page)
                Winnings (private: Total - private: Range)
            */}
            <div className="flex flex-col w-full">
                {/* profile card */}
                <div className="flex flex-row my-4 justify-center items-center border-2 border-emerald-400 p-5">
                    <div className="flex flex-col w-1/2 items-center justify-center">Picture</div>
                    <div className="flex flex-col w-1/2">
                        <span>{userData.displayName ? userData.displayName : "--"}</span>
                        <span>Member Since {userData.createdAt.toLocaleDateString("en-US", { year: "numeric" })}</span>
                    </div>
                </div>
                <p> Connected Wallet: {wallet}</p>

                <button onClick={() => setOpen(true)} className="px-4 py-3 my-4 bg-gray-200 rounded-full">
                    {userData.IsNewUser ? "Complete Profile" : "Update Profile"}
                </button>

                <div className="flex flex-row my-4 justify-center items-center border-2 border-emerald-400 p-5">
                    <div className="flex flex-col w-1/2 items-center">
                        <span className="p-3">
                            Record: {userData.wins} Wins - {userData.losses} Losses
                        </span>
                        <span className="p-3">
                            Winnings <br /> (Private Total - Public Range)
                        </span>
                    </div>
                    <div className="flex flex-col w-1/2 items-center">
                        <span className="p-3">{userData.pos ? userData.pos : "100%"}</span>
                        <span className="p-3">
                            Sport Preferences:
                            <ul>
                                {userData.sportsPreferences &&
                                    userData.sportsPreferences.map((sport, i) => {
                                        return <li key={i}>{sport}</li>;
                                    })}
                            </ul>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col my-4 justify-center items-center border-2 border-emerald-400 p-5">
                    <div className="flex flex-row">
                        <div className="flex flex-col w-1/2 items-center">
                            <h1>Team</h1>
                        </div>
                        <div className="flex flex-col w-1/2 justify-center items-center">
                            <button className="px-2 py-1 w-[120px] mx-4 bg-gray-200 rounded-full">Create Team</button>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col w-1/2 items-center">
                            <span className="p-3">Team Name</span>
                            <span className="p-3">Team Description</span>
                        </div>

                        <div className="flex flex-col w-1/2 items-center">
                            <button className="px-2 py-1 my-4 bg-gray-200 rounded-full">Leave Team</button>
                        </div>
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
    const [editDisplayName, setEditDisplayName] = useState(user.displayName || "");
    const [editSportsPreferences, setEditSportsPreferences] = useState("null");
    console.log(user, editDisplayName, editSportsPreferences);

    return (
        <div className="flex flex-col border-2 border-green-100 p-4 items-center">
            <div>Edit Profile</div>
            {user.IsNewUser && <span className="py-2">Please complete profile:</span>}
            <div className="p-2">
                Display Name: <input value={editDisplayName} onChange={(e) => setEditDisplayName(e)} />
            </div>
            <div className="p-2">
                Sports Preferences: <input value={editSportsPreferences} onChange={(e) => setEditSportsPreferences(e)} />
            </div>
            <div className="p-2">
                Picture: <input type="file" />
            </div>
            <button className="my-3 px-2 py-1 bg-green-300 rounded-full">Save</button>
        </div>
    );
};
