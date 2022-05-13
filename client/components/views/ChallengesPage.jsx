import { useState } from "react";
import { useWallet } from "../../context/WalletProvider";

export default function ChallengesPage({ userData, teams, isCurrentUser = false, isLoading = false, wallet, userObject }) {
    const { user, isAuthenticated, connectWallet, isAuthenticating } = useWallet();
    const [editProfileModal, toggleEditProfileModal] = useState(false);

    return (
        <div>
            <h1>Challenges Page</h1>
        </div>
    );
}
