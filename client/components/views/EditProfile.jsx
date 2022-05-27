import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralisFile } from "react-moralis";
import { sports } from "../../configs/constants";
import { useContract } from "../../context/ContractProvider";
import Modal from "../Layout/Modal";
import { Toast } from "../Toast";

export const EditProfile = ({ user, toggleModal, modalView, userObject }) => {
    const router = useRouter();
    const { error, isUploading, saveFile } = useMoralisFile();
    const { createTeam, isContractLoading, contractMessage } = useContract();
    const [editDisplayName, setEditDisplayName] = useState("");
    const [editSportsPreferences, setEditSportsPreferences] = useState([]);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        if (isFormValid()) {
            const formData = {
                userDisplayName: editDisplayName,
                userSportsPreferences: editSportsPreferences,
                newUser: false, // activate user by default
            };

            try {
                if (file) {
                    const fileUpload = await saveFile(user.username, file);
                    formData.userPhoto = fileUpload._url;
                }
                if (user.newUser) {
                    // create user on chain to be challenged
                    const createTeamOnChain = await createTeam();
                    if (!createTeamOnChain) return;
                }
                // update user in database
                await userObject.save(formData);
                if (!userObject.isSaving) router.reload();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleSportsPreferences = (sport, isChecked) => {
        if (isChecked) {
            setEditSportsPreferences([...editSportsPreferences].filter((eaSport) => eaSport != sport));
        } else {
            setEditSportsPreferences([sport, ...editSportsPreferences]);
        }
    };

    const isFormValid = () => {
        if (!editDisplayName || editSportsPreferences.length < 1) {
            alert("Please fill out all fields.");
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (user) {
            setEditDisplayName(user.userDisplayName || "");
            setEditSportsPreferences(user.userSportsPreferences || []);
        }
    }, [user]);

    return (
        <Modal open={modalView} onClose={() => toggleModal(false)}>
            <div className="flex flex-col border-2 border-green-100 p-4 items-center w-full">
                <div className="p-2">
                    {user && user.newUser ? <span className="py-2 text-red-400">Complete your profile:</span> : <div>Edit Profile</div>}
                    {error && <span className="py-2">Upload Error: {error}</span>}
                </div>
                <div className="flex flex-row w-full">
                    <div className="w-1/2 p-2">
                        <span className="h-[60px] my-1 flex justify-end items-center">Display Name:</span>

                        <span className="h-[120px] my-1 flex justify-end items-center">Sports Preferences:</span>

                        <span className="h-[60px] my-1 flex justify-end items-center">Picture:</span>
                    </div>
                    <div className="w-1/2 p-2">
                        <span className="h-[60px] my-1 flex justify-start items-center">
                            <input
                                value={editDisplayName}
                                className="m-2 px-2 py-1 rounded bg-gray-300 outline-green-400"
                                onChange={(e) => setEditDisplayName(e.target.value)}
                            />
                        </span>
                        <span className="h-[120px] my-1 flex justify-start items-center flex-wrap">
                            {sports.sort().map((sport, i) => {
                                const isChecked = editSportsPreferences.includes(sport);
                                return (
                                    <button
                                        key={i}
                                        className={`m-1 px-2 py-1 rounded text-sm  ${isChecked ? "bg-green-100" : "bg-gray-300"}`}
                                        onClick={() => handleSportsPreferences(sport, isChecked)}
                                    >
                                        {sport}
                                    </button>
                                );
                            })}
                        </span>
                        <span className="h-[60px] my-1 flex justify-start items-center">
                            {/* {file && <Image src={file.preview} width="150" height="150" />} */}
                            <input
                                accept="image/x-png,image/gif,image/jpeg"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="mx-3 px-2 py-1 rounded bg-gray-300"
                            />
                        </span>
                    </div>
                </div>
                {isContractLoading ? (
                    <span className="my-3 px-2 py-1 ">...Minting</span>
                ) : (
                    <button
                        disabled={isUploading || userObject.isSaving}
                        className="my-3 px-4 py-1 bg-green-300 rounded-full disabled:bg-gray-400 hover:bg-green-400"
                        onClick={() => handleSubmit()}
                    >
                        Save
                    </button>
                )}
            </div>

            {contractMessage && !isContractLoading && <Toast type={contractMessage.statusColor}>{contractMessage.message}</Toast>}
        </Modal>
    );
};
