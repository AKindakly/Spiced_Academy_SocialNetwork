import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FriendButton from "./FriendButton.jsx";

export default function OtherProfile() {
    const userId = useParams();
    const history = useHistory();

    // const [first_name, setFirstName] = useState("");
    // const [last_name, setlastName] = useState("");
    const [full_name, setFullName] = useState("");
    const [profile_pic, setProfilePic] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        console.log("userID is ", userId.id);
        fetch(`/user/${userId.id}`, {
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success == true) {
                    // console.log("dataaaaaaaa in user/:id ", data.data);
                    setFullName(data.data.full_name);
                    setProfilePic(data.data.profile_pic);
                    setBio(data.data.bio);
                } else {
                    history.push("/profile");
                }
            });
    }, []);

    return (
        <>
            <div className="profile-big-cont">
                <div>
                    <img
                        src={profile_pic || "../emptyProfilePic.png"}
                        className="big-profile-pic"
                    />
                </div>
                <div>
                    <h2>{full_name}</h2>
                    <div className="bio-cont">
                        <p>{bio}</p>
                    </div>
                    <div className="other-profile-btn">
                        <FriendButton />
                    </div>
                </div>
            </div>
        </>
    );
}
