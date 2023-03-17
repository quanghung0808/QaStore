import { Checkbox } from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { setShowToast } = useContext(AuthContext);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const {
    authState: { user },
    updateProfile,
  } = useContext(AuthContext);

  console.log(user._id);

  const [updateProfileForm, setUpdateProfileForm] = useState({
    fullname: user.fullname,
    yob: user.yob,
    username: user.username,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { fullname, yob, username, oldPassword, newPassword, confirmPassword } =
    updateProfileForm;

  const onChangeUpdateProfileForm = (event) =>
    setUpdateProfileForm({
      ...updateProfileForm,
      [event.target.name]: event.target.value,
    });

  const update = async (event) => {
    event.preventDefault();
    try {
      if (
        newPassword !== "" &&
        oldPassword !== "" &&
        newPassword === oldPassword
      ) {
        await setShowToast({
          show: true,
          message: "The new password cannot be the same as the old password",
          type: "error",
        });
        setUpdateProfileForm({
          ...updateProfileForm,
          newPassword: "",
          confirmPassword: "",
        });
      } else if (confirmPassword !== newPassword) {
        await setShowToast({
          show: true,
          message: "Password does not match",
          type: "error",
        });
        setUpdateProfileForm({
          ...updateProfileForm,
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const responseData = await updateProfile(updateProfileForm, user._id);
        console.log(responseData);
        if (responseData.success) {
          await setShowToast({
            show: true,
            message: "Update Successfully",
            type: "success",
          });
          setShowChangePassword(false);
          setUpdateProfileForm({
            ...updateProfileForm,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
        if (!responseData.success) {
          await setShowToast({
            show: true,
            message: responseData.message,
            type: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="item-details-page">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div
                class="section-heading"
                style={{ marginBottom: "60px", marginTop: "40px" }}
              >
                <h2>
                  My <em>Profile</em> Here.
                </h2>
              </div>
            </div>
            <form
              onSubmit={update}
              id="contact"
              style={{ width: "70%", margin: "auto", padding: "45px 80px" }}
            >
              <div class="col-lg-12">
                <div class="col-lg-12">
                  <fieldset>
                    <label for="fullname">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={fullname}
                      onChange={onChangeUpdateProfileForm}
                      minLength="1"
                      maxLength="40"
                      id="fullname"
                      placeholder="Full Name"
                      required
                    />
                  </fieldset>
                </div>
                <div class="col-lg-12">
                  <fieldset>
                    <label for="yob">Date of birth</label>
                    <input
                      type="date"
                      name="yob"
                      value={yob}
                      onChange={onChangeUpdateProfileForm}
                      id="yob"
                      placeholder="Date of birth"
                      required
                    />
                  </fieldset>
                </div>
                <div class="col-lg-12">
                  <fieldset>
                    <label for="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={onChangeUpdateProfileForm}
                      pattern="^[A-Za-z0-9]+$"
                      title="Not accept special character"
                      minLength={8}
                      maxLength={30}
                      id="username"
                      placeholder="Username"
                      required
                    />
                  </fieldset>
                </div>
                <div class="col-lg-6">
                  <fieldset>
                    <Checkbox
                      onClick={() => {
                        setShowChangePassword(!showChangePassword);
                        if (showChangePassword === false) {
                          setUpdateProfileForm({
                            ...updateProfileForm,
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                        }
                      }}
                      id="form-submit"
                      class="orange-button"
                      style={{ padding: "5px 20px" }}
                    >
                      Change password?
                    </Checkbox>
                  </fieldset>
                </div>
                {showChangePassword && (
                  <>
                    <div class="col-lg-12">
                      <fieldset>
                        <label for="oldPassword">Old password</label>
                        <input
                          type="password"
                          name="oldPassword"
                          value={oldPassword}
                          onChange={onChangeUpdateProfileForm}
                          id="oldPassword"
                          placeholder="Enter your old password"
                          required
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <label for="newPassword">New password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={newPassword}
                          onChange={onChangeUpdateProfileForm}
                          id="newPassword"
                          placeholder="Enter your new password"
                          required
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <label for="confirmPassword">
                          Confirm New password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={onChangeUpdateProfileForm}
                          id="confirmPassword"
                          placeholder="Confirm your new password"
                          required
                        />
                      </fieldset>
                    </div>
                  </>
                )}

                <div class="col-lg-12">
                  <fieldset>
                    <button
                      type="submit"
                      id="form-submit"
                      class="orange-button"
                    >
                      Submit Your Applying
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
