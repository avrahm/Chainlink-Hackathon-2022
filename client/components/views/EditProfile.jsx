import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralisFile } from "react-moralis";
import Modal from "../Layout/Modal";

export const EditProfile = ({ user, toggleModal, modalView, userObject }) => {
    const router = useRouter();
    const { error, isUploading, saveFile } = useMoralisFile();

    const [editDisplayName, setEditDisplayName] = useState("");
    const [newSportInput, setNewSportInput] = useState("");
    const [editSportsPreferences, setEditSportsPreferences] = useState([]);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
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
            await userObject.save(formData);
            if (!userObject.isSaving) router.reload();
        } catch (error) {
            console.error(error);
        }
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
            setEditDisplayName(user.userDisplayName || "");
            setEditSportsPreferences(user.userSportsPreferences || []);
        }
    }, [user]);

    return (
      <Modal open={modalView} onClose={() => toggleModal(false)}>
        <div className="flex flex-col border-2 border-green-100 p-4 items-center">
          <div>Edit Profile</div>

          <div className="p-2">
            {user && user.newUser && (
              <span className="py-2 text-red-400">
                Please complete profile:
              </span>
            )}
            {error && <span className="py-2">Upload Error: {error}</span>}
          </div>

          <div className="p-2">
            <span>Display Name:</span>
            <input
              value={editDisplayName}
              className="mx-3 px-2 py-1 rounded bg-gray-300 outline-green-400"
              onChange={(e) => setEditDisplayName(e.target.value)}
            />
          </div>

          <div className="p-2">
            <span>Sports Preferences:</span>
            <input
              value={newSportInput}
              className="mx-3 px-2 py-1 rounded bg-gray-300 outline-green-400"
              onChange={(e) => setNewSportInput(e.target.value)}
            />
            <button
              onClick={() => handleAddSportsPreferences()}
              disabled={newSportInput.length < 1}
              className="px-2 py-1 rounded bg-green-400 disabled:bg-slate-300"
            >
              Add
            </button>
            {editSportsPreferences != undefined && (
              <ul>
                {editSportsPreferences.map((sport, i) => {
                  return (
                    <li key={i}>
                      {sport.toUpperCase()}
                      <button
                        className="bg-green-300 rounded justify-center p-1 items-center text-xs"
                        onClick={() => handleRemoveSportsPreferences(i)}
                      >
                        X
                      </button>
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
          <button
            disabled={isUploading || userObject.isSaving}
            className="my-3 px-4 py-1 bg-green-300 rounded-full disabled:bg-gray-400 hover:bg-green-400"
            onClick={() => handleSubmit()}
          >
            Save
          </button>
        </div>
      </Modal>
    );
};
