import { useState } from "react";
import Modal from "./Modal";

export default function Profile({ wallet, user }) {
    const [open, setOpen] = useState(false);

    console.log(user);

    const { attributes } = user;
    console.log(attributes);
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
                        <span>Name</span>
                        <span>Member Since - Created By Date</span>
                    </div>
                </div>
                <p> Connected Wallet: {wallet}</p>

                <button onClick={() => setOpen(true)} className="px-4 py-3 my-4 bg-gray-200 rounded-full">
                    {attributes.IsNewUser ? "Complete Profile" : "Update Profile"}
                </button>

                <div className="flex flex-row my-4 justify-center items-center border-2 border-emerald-400 p-5">
                    <div className="flex flex-col w-1/2 items-center">
                        <span className="p-3">Record</span>
                        <span className="p-3">
                            Winnings <br /> (Private Total - Public Range)
                        </span>
                    </div>
                    <div className="flex flex-col w-1/2 items-center">
                        <span className="p-3">100% Proof of Sportsmanship</span>
                        <span className="p-3">Sport Preferences</span>
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
                    <EditProfile user={user} />
                </Modal>
            </div>
        </div>
    );
}

const EditProfile = (user) => {
    return (
        <div className="flex flex-col border-2 border-green-100 p-4 items-center">
            <p>New User</p>
            <span className="py-2">Please complete profile:</span>
            <p>Display Name: </p>
            <p>UserName: </p>
            <p>Preferences: </p>
            <p>Picture (?)</p>
            <button className="my-3 px-2 py-1 bg-green-300 rounded-full">Save</button>
        </div>
    );
};
