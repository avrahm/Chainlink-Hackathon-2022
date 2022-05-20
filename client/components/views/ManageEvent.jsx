import { useRouter } from "next/router";
import { useState } from "react";
import { useMoralisFile, useNewMoralisObject } from "react-moralis";
import Modal from "../Layout/Modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const ManageEvent = ({
  user,
  event = false,
  toggleModal,
  modalView,
  createNewEvent = false,
  teamObject = null,
}) => {
  const newTeamObject = {
    teamWins: 0,
    teamWinnings: 0,
    teamLosses: 0,
    teamPOS: 100,
  };

  const { error, isUploading, saveFile } = useMoralisFile();
  const getEventsDB = useNewMoralisObject("events");
  const router = useRouter();

  const [eventName, setEventName] = useState(event.eventName || "");
  const [startDate, setStartDate] = useState(new Date());
  const [newSportInput, setNewSportInput] = useState("");
  const [teamSportsPreferences, setTeamSportsPreferences] = useState(
    event.teamSportsPreferences || []
  );
  const [eventLocation, setEventLocation] = useState(event.eventLocation || "");
  const [prizePool, setPrizePool] = useState(0);

  const handleSubmit = async (e) => {
    const teamFormData = {
      eventName: eventName,
      teamSportsPreferences: teamSportsPreferences,
      // teamAdmin: team.teamAdmin || user.username,
      teamMembers: team.teamMembers || [user.username],
      eventLocation: eventLocation || "",
      ...newTeamObject,
    };

    //
    const teamUsername = teamName.split(" ").join("-").toLowerCase();

    try {
      if (createNewTeam) teamFormData.teamUsername = teamUsername;
      if (teamObject) teamFormData.id = teamObject.id;

      // save team to database... this will create a new team if it doesn't exist
      if (createNewEvent) await getEventsDB.save(teamFormData);
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
    const newPreferences = teamSportsPreferences.filter(
      (sport, index) => index !== i
    );
    setTeamSportsPreferences(newPreferences);
  };

  return (
    <Modal open={modalView} onClose={() => toggleModal(false)}>
      <div className="flex flex-col border-2 border-green-100 p-4 items-center">
        <div> {createNewEvent ? "Create Event" : "Manage Event"}</div>

        {/* {teamError && <span className="py-2">Team Update Error:{teamError}</span>} */}
        {/* {error && <span className="py-2">Upload Error: {error}</span>} */}

        <div className="p-2">
          <span htmlFor="eventName">Event Name:</span>
          <input
            id="eventName"
            value={eventName}
            className="mx-3 px-2 py-1 rounded bg-gray-300"
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="flex p-2">
          <span htmlFor="eventDate" className="">
            EventDate:
          </span>
          <DatePicker
            className="mx-3 px-2 py-1 rounded bg-gray-300 ml-6"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="p-2">
          <span htmlFor="eventLocation" className="pr-1">
            Event Location:
          </span>
          <input
            id="eventLocation"
            className="mr-5 px-2 py-1 rounded bg-gray-300 outline-none"
            placeholder="Enter Event Location..."
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
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
          <span htmlFor="prizePool">Prize Pool:</span>
          <input
            id="prizePool"
            className="ml-3 mr-2 px-3 py-1 rounded bg-gray-300 w-10"
            // placeholder="Enter Prize..."
            value={prizePool}
            onChange={(e) => setPrizePool(e.target.value)}
          />
          <span htmlFor="prizePool" className="text-bold">
            VYBES
          </span>
        </div>
        <button
          className="my-3 px-2 py-1 bg-green-300 rounded-full"
          onClick={() => handleSubmit()}
        >
          {createNewEvent ? "Create Event" : "Update Event"}
        </button>
      </div>
    </Modal>
  );
};
