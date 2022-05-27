import { useState } from "react";
import { useWallet } from "../../context/WalletProvider";
import { Photo } from "../Photo";
import { EditProfile } from "./EditProfile";
import { ManageTeam } from "./ManageTeam";
import { ManageEvent } from "./ManageEvent";

import { TeamCard } from "./TeamCard";

export default function Profiles({ userData, teams, isCurrentUser = false, isLoading = false, wallet, userObject }) {
    const { user, isAuthenticated, connectWallet, isAuthenticating } = useWallet();
    const [editProfileModal, toggleEditProfileModal] = useState(false);
    const [manageEventModal, toggleManageEventModal] = useState(false);
    const [manageTeamModal, toggleManageTeamModal] = useState(false);

    return (
      <div className="flex flex-col justify-center items-center">
        <div className="py-4">
<<<<<<< HEAD
          <h1>Player Profile</h1>
        </div>
        <div className="flex flex-col w-[480px] lg:w-[600px]">
          <div className="flex flex-col w-full justify-center items-center border-2 border-emerald-400 p-5">
=======
          <h1>PLAYER PROFILE:</h1>
        </div>
        <div className="flex flex-col w-[480px] lg:w-[600px]">
          <div className="flex flex-col w-full justify-center items-center border-gray-200 p-2 rounded-lg shadow-lg bg-white hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-outp-5">
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
            <div className="flex flex-row my-4 w-full justify-center items-center">
              <div className="flex flex-col w-1/2 items-center justify-center">
                <Photo
                  isLoading={isLoading}
                  src={userData.userPhoto}
                  alt={userData.userDisplayName}
                  size="lg"
                  type="profile"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <span>
                  {userData.userDisplayName ? userData.userDisplayName : "--"}
                </span>
                <span>
                  Member Since{" "}
                  {userData.createdAt
                    ? userData.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                      })
                    : "--"}
                </span>
              </div>
            </div>
            {wallet && <p> Wallet: {wallet}</p>}
          </div>
          <div className="w-full">
            {wallet ? (
              <button
                onClick={() => toggleEditProfileModal(true)}
<<<<<<< HEAD
                className="px-4 py-3 my-4 w-full bg-gray-200 rounded-full"
=======
                className="px-4 py-3 my-4 w-full bg-green-200 rounded-full hover:bg-green-400"
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
              >
                {userData.newUser ? "Complete Profile" : "Edit Profile"}
              </button>
            ) : (
              <>
                {isAuthenticated && (
                  <button
                    onClick={() => alert("Challenge")}
<<<<<<< HEAD
                    className="px-4 py-3 my-4  w-full bg-green-200 rounded-full"
=======
                    className="px-4 py-3 my-4  w-full bg-green-200 rounded-full hover:bg-green-400 "
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
                  >
                    Challenge Player
                  </button>
                )}
                {!isAuthenticated && (
                  <button
                    disabled={isAuthenticating}
<<<<<<< HEAD
                    className="rounded-full bg-green-200 px-4 py-3 my-4  w-full disabled:bg-gray-400"
=======
                    className="rounded-full bg-green-200 px-4 py-3 my-4  w-full disabled:bg-gray-400 hover:bg-green-400 "
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
                    onClick={() => connectWallet(false)}
                  >
                    Connect Wallet to Challenge
                  </button>
                )}
              </>
            )}
          </div>
<<<<<<< HEAD
          <div className="flex flex-row my-4 justify-center items-start border-2 border-emerald-400 p-2">
=======
          <div className="flex flex-row my-4 justify-center items-start border-2 border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out p-2">
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
            <div className="flex flex-col w-1/2 items-center p-2">
              <div className="flex flex-col justify-center items-center">
                <span className="p-2 font-bold">Record:</span>
                <span>
                  {userData.userWins} Wins - {userData.userLosses} Losses
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="p-2 font-bold">Winnings:</span>
                <span>{userData.userWinnings} VYBES</span>
              </div>
            </div>
            <div className="flex flex-col w-1/2 items-center p-2">
              <div className="flex flex-col justify-center items-center">
                <span className="p-2 font-bold">Sportsmanship:</span>
                <span>
                  {userData.userPOS ? `${userData.userPOS}% ` : "100%"}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="p-2 font-bold">Sport Preferences:</span>
                <ul>
                  {userData.userSportsPreferences &&
                    userData.userSportsPreferences.map((sport, i) => {
                      return <li key={i}>{sport.toUpperCase()}</li>;
                    })}
                </ul>
              </div>
<<<<<<< HEAD
            </div>
          </div>
          <div className="flex flex-col my-4 w-full justify-around items-center border-2 border-emerald-400 p-2">
            <div className="flex flex-row w-full justify-center py-3 items-center">
              <h1>Team(s) </h1>
              {isAuthenticated && isCurrentUser && (
                <button
                  className="px-2 py-1 w-[120px] mx-4 bg-gray-200 rounded-full"
                  onClick={() => toggleManageTeamModal(!manageTeamModal)}
                >
                  Create Team
                </button>
              )}
            </div>
            <div className="w-full">
              {teams && !isLoading ? (
                teams.length > 0 &&
                teams.map((team, i) => {
                  return (
                    <TeamCard
                      team={team.attributes}
                      teamObject={team}
                      key={i}
                      leaveTeam={true}
                      user={user}
                    />
                  );
                })
              ) : (
                <h1>No Teams</h1>
              )}
            </div>
          </div>
          <div className="flex flex-col my-4 w-full justify-around items-center border-2 border-emerald-400 p-2">
            <div className="flex flex-row w-full justify-center py-3 items-center">
              <h1>Event(s) </h1>
              {isAuthenticated && isCurrentUser && (
                <button
                  className="px-2 py-1 w-[120px] mx-4 bg-gray-200 rounded-full"
                  onClick={() => toggleManageEventModal(!manageEventModal)}
                >
                  Create Event
                </button>
              )}
            </div>
=======
            </div>
          </div>
          <div className="flex flex-col my-4 w-full justify-around items-center  p-2">
            <div className="flex flex-row w-full justify-center py-3 items-center">
              <h1>Team(s) </h1>
              {isAuthenticated && isCurrentUser && (
                <button
                  className="px-2 py-1 w-[120px] mx-4 bg-green-200 rounded-full hover:bg-green-400"
                  onClick={() => toggleManageTeamModal(!manageTeamModal)}
                >
                  Create Team
                </button>
              )}
            </div>
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
            <div className="w-full">
              {teams && !isLoading ? (
                teams.length > 0 &&
                teams.map((team, i) => {
                  return (
                    <TeamCard
                      team={team.attributes}
                      teamObject={team}
                      key={i}
                      leaveTeam={true}
                      user={user}
                    />
                  );
                })
              ) : (
<<<<<<< HEAD
                <h1>No Events</h1>
=======
                <h1>No Teams</h1>
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
              )}
            </div>
          </div>
        </div>

        <EditProfile
<<<<<<< HEAD
          user={user}
=======
          user={userData}
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
          toggleModal={toggleEditProfileModal}
          modalView={editProfileModal}
          userObject={userObject}
        />

        <ManageTeam
<<<<<<< HEAD
          user={user}
=======
          user={userData}
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
          toggleModal={toggleManageTeamModal}
          modalView={manageTeamModal}
          createNewTeam={true}
        />
<<<<<<< HEAD
        <ManageEvent
          user={user}
          toggleModal={toggleManageEventModal}
          modalView={manageEventModal}
          createNewEvent={true}
        />
=======
>>>>>>> d04e763462215ad95320d63a0b853c7c7232ec90
      </div>
    );
}
