import { useRouter } from "next/router";
import { useState } from "react";
import { useMoralisFile, useNewMoralisObject } from "react-moralis";
import Modal from "../Layout/Modal";

export const ManageTeam = ({ user, team = false, toggleModal, modalView, createNewTeam = false, teamObject = null }) => {
    const newTeamObject = {
        teamWins: 0,
        teamWinnings: 0,
        teamLosses: 0,
        teamPOS: 100,
    };

    const { error, isUploading, saveFile } = useMoralisFile();
    const getTeamsDB = useNewMoralisObject("teams");
    const router = useRouter();

    const [teamName, setTeamName] = useState(team.teamName || "");
    const [newSportInput, setNewSportInput] = useState("");
    const [teamSportsPreferences, setTeamSportsPreferences] = useState(team.teamSportsPreferences || []);
    const [isTeamActive, setisTeamActive] = useState(team.isTeamActive || false);
    const [file, setFile] = useState(null);
    const toggleClass = " transform translate-x-6 bg-green-300";

    const handleSubmit = async (e) => {
        const teamFormData = {
            teamName: teamName,
            teamSportsPreferences: teamSportsPreferences,
            teamAdmin: team.teamAdmin || user.username,
            teamMembers: team.teamMembers || [user.username],
            isTeamActive: isTeamActive,
            ...newTeamObject,
        };

        //
        const teamUsername = teamName.split(" ").join("-").toLowerCase();

        try {
            if (createNewTeam) teamFormData.teamUsername = teamUsername;
            if (teamObject) teamFormData.id = teamObject.id;
            if (file) {
                const fileUpload = await saveFile(teamUsername, file);
                teamFormData.teamPhoto = fileUpload._url;
            }

            // save team to database... this will create a new team if it doesn't exist
            if (createNewTeam) await getTeamsDB.save(teamFormData);
            if (teamObject) await teamObject.save(teamFormData);
            if (!getTeamsDB.isSaving || !teamObject.isSaving) router.reload();
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
                <div> {createNewTeam ? "Create Team" : "Manage Team"}</div>

                {/* {teamError && <span className="py-2">Team Update Error:{teamError}</span>} */}
                {/* {error && <span className="py-2">Upload Error: {error}</span>} */}

                <div className="p-2">
                    <span htmlFor="teamName">Team Name:</span>
                    <input
                        id="teamName"
                        value={teamName}
                        className="mx-3 px-2 py-1 rounded bg-gray-300"
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>
                <div className="p-2">
                    <div className="flex flex-row justify-center">
                        <label className="mx-3">{isTeamActive ? "Active" : "Inactive"}</label>
                        <div
                            className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
                            onClick={() => {
                                setisTeamActive(!isTeamActive);
                            }}
                        >
                            <div
                                className={"bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform" + (isTeamActive ? toggleClass : null)}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <span htmlFor="sportsInput">Sports Preferences:</span>
                    <input
                        id="sportsInput"
                        value={newSportInput}
                        className="mx-3 px-2 py-1 rounded bg-gray-300"
                        onChange={(e) => setNewSportInput(e.target.value)}
                    />
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
                    {createNewTeam ? "Create Team" : "Update Team"}
                </button>
            </div>
        </Modal>
    );
};
