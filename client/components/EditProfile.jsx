import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";

export const EditProfile = ({ user }) => {
    const { setUserData, userError, isUserUpdating } = useMoralis();
    const { error, isUploading, saveFile } = useMoralisFile();
    const router = useRouter();

    const [editDisplayName, setEditDisplayName] = useState("");
    const [newSportInput, setNewSportInput] = useState("");
    const [editSportsPreferences, setEditSportsPreferences] = useState([]);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        const formData = {
            displayName: editDisplayName,
            sportsPreferences: editSportsPreferences,
            IsNewUser: false,
        };

        if (file) {
            const fileUpload = await saveFile(user.username, file);
            formData.profilePicture = fileUpload._url;
        }

        await setUserData(formData);
        setFile(null);
        router.reload();
    };

    const handleAddSportsPreferences = () => {
        setEditSportsPreferences([newSportInput, ...editSportsPreferences]);
        setNewSportInput("");
    };

    const handleRemoveSportsPreferences = (i) => {
        const newPreferences = editSportsPreferences.filter((sport, index) => index !== i);
        setEditSportsPreferences(newPreferences);
    };

    useEffect(() => {
        if (user) {
            setEditDisplayName(user.displayName);
            setEditSportsPreferences(user.sportsPreferences || []);
        }
    }, [user]);

    return (
        <div className="flex flex-col border-2 border-green-100 p-4 items-center">
            <div>Edit Profile</div>

            {user.IsNewUser || (user.IsNewUser == undefined && <span className="py-2 text-red-400">Please complete profile:</span>)}
            {userError && <span className="py-2">User Update Error:{userError}</span>}
            {error && <span className="py-2">Upload Error: {error}</span>}

            <div className="p-2">
                <span>Display Name:</span>
                <input value={editDisplayName} className="mx-3 px-2 py-1 rounded bg-gray-300" onChange={(e) => setEditDisplayName(e.target.value)} />
            </div>

            <div className="p-2">
                <span>Sports Preferences:</span>
                <input value={newSportInput} className="mx-3 px-2 py-1 rounded bg-gray-300" onChange={(e) => setNewSportInput(e.target.value)} />
                <button onClick={() => handleAddSportsPreferences()} className="px-2 py-1 rounded bg-green-400">
                    Add
                </button>
                {editSportsPreferences != undefined && (
                    <ul>
                        {editSportsPreferences.map((sport, i) => {
                            return (
                                <li key={i}>
                                    {sport.toUpperCase()} <button onClick={() => handleRemoveSportsPreferences(i)}>Remove</button>{" "}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className="p-2">
                <span>Picture:</span>
                <input
                    accept="image/x-png,image/gif,image/jpeg"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mx-3 px-2 py-1 rounded bg-gray-300"
                />
            </div>
            <button disabled={isUserUpdating || isUploading} className="my-3 px-2 py-1 bg-green-300 rounded-full" onClick={() => handleSubmit()}>
                Save
            </button>
        </div>
    );
};
