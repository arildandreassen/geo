import * as React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const defaultProfile = {
    displayName: "",
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [readOnly, setReadOnly] = useState(true);
  const [previousState, setPreviousState] = useState(null);

  const getProfile = () => {
    return window.localStorage.getItem("profile");
  };

  useEffect(() => {
    const current = getProfile();
    if (current) {
      setProfile(JSON.parse(current));
    }
  }, []);

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setProfile((profile) => {
      return {
        ...profile,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    window.localStorage.setItem("profile", JSON.stringify(profile));
    setReadOnly(!readOnly);
    console.log("submit");
  };

  const handleCancel = (event: any) => {
    event.preventDefault();
    console.log(previousState);
    setProfile(() => {
      return previousState;
    });
    setReadOnly(!readOnly);
  };

  const handleEdit = (event: any) => {
    const state = JSON.parse(window.localStorage.getItem("profile"));
    setPreviousState(state);
    event.preventDefault();
    setReadOnly(!readOnly);
  };

  return (
    <div>
      <fieldset>
        <legend>Profile</legend>
        <div className="profile-container">
          <form onSubmit={handleSubmit} className="grid-item-2">
            <div className="profile-data">
              <div className="profile-row">
                <label>Display Name: </label>
                <input
                  type="text"
                  name="displayName"
                  onChange={handleFormChange}
                  value={profile?.displayName}
                  readOnly={readOnly}
                ></input>
              </div>
            </div>
            {readOnly === false ? (
              <input type="button" onClick={handleCancel} value="Cancel" />
            ) : null}
            {readOnly === false ? (
              <input type="submit" value="Save" />
            ) : (
              <input type="button" onClick={handleEdit} value="Edit" />
            )}
          </form>
        </div>
      </fieldset>
    </div>
  );
}

export default Profile;
