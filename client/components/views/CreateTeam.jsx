import { useRouter } from "next/router";
import { useState } from "react";
import { useMoralisFile, useNewMoralisObject } from "react-moralis";
import Modal from "../Layout/Modal";

export const CreateTeam = ({ user, team = false, toggleModal, modalView }) => {
    const newTeam = {
        teamWins: 0,
        teamWinnings: 0,
        teamLosses: 0,
        teamPOS: 100,
    };

    const { error, isUploading, saveFile } = useMoralisFile();
    const createNewTeam = useNewMoralisObject("teams");
    const router = useRouter();

    const [teamName, setTeamName] = useState("");
    const [newSportInput, setNewSportInput] = useState("");
    const [teamSportsPreferences, setTeamSportsPreferences] = useState([]);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        const formData = {
            teamName: teamName,
            teamSportsPreferences: teamSportsPreferences,
            teamAdmin: user.username,
            teamMembers: [user.username],
            ...newTeam,
        };

        const teamUsername = teamName.split(" ").join("-").toLowerCase();

        try {
            formData.teamUsername = teamUsername;
            if (file) {
                const fileUpload = await saveFile(teamUsername, file);
                formData.teamPhoto = fileUpload._url;
            }

            await createNewTeam.save(formData);
            if (!createNewTeam.isSaving) router.reload();
        } catch (error) {
            console.error(error);
        }
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
                    <input value={teamName} className="mx-3 px-2 py-1 rounded bg-gray-300" onChange={(e) => setTeamName(e.target.value)} />
                </div>

                <div className="p-2">
                    <span>Sports Preferences:</span>
                    <input value={newSportInput} className="mx-3 px-2 py-1 rounded bg-gray-300" onChange={(e) => setNewSportInput(e.target.value)} />
                    <button
                        onClick={() => handleAddSportsPreferences()}
                        disabled={newSportInput.length < 1}
                        className="px-2 py-1 rounded bg-green-400 disabled:bg-slate-300"
                    >
                        Add
                    </button>
                    {teamSportsPreferences != undefined && (
                        <ul>
                            {teamSportsPreferences.map((sport, i) => {
                                return (
                                    <li key={i}>
                                        {sport.toUpperCase()}
                                        <button
                                            onClick={() => handleRemoveSportsPreferences(i)}
                                            className="bg-red-300 rounded-full justify-center ml-4 px-2 items-center text-xs"
                                        >
                                            -
                                        </button>
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
