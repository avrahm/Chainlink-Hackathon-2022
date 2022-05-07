import { useRouter } from "next/router";
import { useState } from "react";
import { useMoralisFile } from "react-moralis";
import Modal from "../Layout/Modal";

export const CreateTeam = ({ team = false, toggleModal, modalView }) => {
    const { error, isUploading, saveFile } = useMoralisFile();
    const router = useRouter();

    const [teamDisplayName, setTeamDisplayName] = useState("");
    const [newSportInput, setNewSportInput] = useState("");
    const [teamSportsPreferences, setTeamSportsPreferences] = useState([]);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        const formData = {
            teamDisplayName: teamDisplayName,
            teamSportsPreferences: teamSportsPreferences,
        };

        if (file) {
            //     const fileUpload = await saveFile(team.teamname, file);
            //     formData.profilePicture = fileUpload._url;
            formData.teamPhoto = file.name;
        }

        // await setTeamData(formData);
        // setFile(null);
        // router.reload();
        console.log(formData);
    };

    const handleAddSportsPreferences = () => {
        setTeamSportsPreferences([newSportInput, ...teamSportsPreferences]);
        setNewSportInput("");
    };

    const handleRemoveSportsPreferences = (i) => {
        const newPreferences = teamSportsPreferences.filter((sport, index) => index !== i);
        setTeamSportsPreferences(newPreferences);
    };

    return (
        <Modal open={modalView} onClose={() => toggleModal(false)}>
            <div className="flex flex-col border-2 border-green-100 p-4 items-center">
                <div>Create Team</div>

                {/* {teamError && <span className="py-2">Team Update Error:{teamError}</span>} */}
                {/* {error && <span className="py-2">Upload Error: {error}</span>} */}

                <div className="p-2">
                    <span>Team Name:</span>
                    <input
                        value={teamDisplayName}
                        className="mx-3 px-2 py-1 rounded bg-gray-300"
                        onChange={(e) => setTeamDisplayName(e.target.value)}
                    />
                </div>

                <div className="p-2">
                    <span>Sports Preferences:</span>
                    <input value={newSportInput} className="mx-3 px-2 py-1 rounded bg-gray-300" onChange={(e) => setNewSportInput(e.target.value)} />
                    <button onClick={() => handleAddSportsPreferences()} className="px-2 py-1 rounded bg-green-400">
                        Add
                    </button>
                    {teamSportsPreferences != undefined && (
                        <ul>
                            {teamSportsPreferences.map((sport, i) => {
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
                    <span>Team Photo:</span>
                    <input
                        accept="image/x-png,image/gif,image/jpeg"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="mx-3 px-2 py-1 rounded bg-gray-300"
                    />
                </div>
                <button className="my-3 px-2 py-1 bg-green-300 rounded-full" onClick={() => handleSubmit()}>
                    Create Team
                </button>
            </div>
        </Modal>
    );
};
