import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";
import { storage } from ".././firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NationContext } from "../../contexts/NationContext";

const UpdatePlayer = () => {
  const [allNation, setAllNation] = useState(
    JSON.parse(localStorage.getItem("Nations"))
  );
  //contexts
  const {
    playerState: { player },
    findPlayer,
    updatePlayer,
    setShowToast,
  } = useContext(PlayerContext);

  const currentURL = window.location.pathname.slice(16); // returns the absolute URL of a page
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const [newPlayer, setNewPlayer] = useState({
    name: player.name,
    position: player.position,
    nation: player.nation,
    goals: player.goals,
    isCaptain: player.isCaptain,
    description: player.description,
  });
  const { getNations } = useContext(NationContext);
  // Start: Get All nationss
  useEffect(() => {
    getNations();
    setAllNation(JSON.parse(localStorage.getItem("Nations")));
  }, []);
  useEffect(() => {
    findPlayer(currentURL);
    const data = localStorage.getItem("PlayerDetail");
    console.log(data);
    if (data !== "undefined") {
      setNewPlayer(JSON.parse(data));
      setUrl(JSON.parse(data).image);
    }
  }, []);

  const { name, position, nation, goals, isCaptain, description } = newPlayer;
  const onChangeNewPlayerForm = (event) => {
    setNewPlayer({ ...newPlayer, [event.target.name]: event.target.value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (image !== null) {
      uploadImg().then(async (ref) => {
        const { success, message } = await updatePlayer(
          newPlayer,
          ref,
          currentURL
        );
        setShowToast({
          show: true,
          message,
          type: success ? "success" : "error",
        });
        if (success) {
          navigate("/players");
        }
      });
    } else {
      const { success, message } = await updatePlayer(
        newPlayer,
        url,
        currentURL
      );
      setShowToast({
        show: true,
        message,
        type: success ? "success" : "error",
      });
      if (success) {
        // window.open("http://localhost:3000/players/");
        navigate("/players");
      }
    }
  };

  const uploadImg = () => {
    // Return a promise that will either resolve or emit an error
    return new Promise((resolve, reject) => {
      console.log("Uploading image ...");
      const imageRef = ref(storage, `images/${image.name}`);
      const put = uploadBytes(imageRef, image).then(async () => {
        const ref = await getDownloadURL(imageRef);
        setImage(ref);
        resolve(ref);
      });
    });
  };
  return (
    <>
      <div class="item-details-page">
        <div class="container">
          <div class="row">
            <Button style={{ width: "100px", marginBottom: "10px" }}>
              <Link
                to={`/players/${player._id}`}
                style={{ marginBottom: "10px" }}
              >
                Back
                <FontAwesomeIcon icon={faArrowLeft} className="" />
              </Link>
            </Button>
            <div class="col-lg-12">
              <div
                class="section-heading"
                style={{ marginBottom: "60px", marginTop: "40px" }}
              >
                <h2>
                  Update <em>Player</em> Here.
                </h2>
              </div>
            </div>
            <form id="contact" onSubmit={onSubmit}>
              <div class="col-lg-12">
                <div class="col-lg-6">
                  <div class="row">
                    <div class="col-lg-12">
                      <fieldset>
                        <label for="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={onChangeNewPlayerForm}
                          pattern="[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{6,40}"
                          title="Not accept number and special character, min length is 6. max length is 40"
                          id="name"
                          placeholder="Player Name"
                          required
                        />
                      </fieldset>
                    </div>

                    <div class="col-lg-12">
                      <fieldset>
                        <label for="position">Position</label>
                        <select
                          name="position"
                          id="position"
                          required
                          value={position}
                          onChange={onChangeNewPlayerForm}
                        >
                          <option value="" disabled selected>
                            Select Position
                          </option>
                          <option value="Goalkeeper (GK)">
                            Goalkeeper (GK)
                          </option>
                          <option value="Center Back (CB)">
                            Center Back (CB)
                          </option>
                          <option value="Full Back (FB)">Full Back (FB)</option>
                          <option value="Wing Back (WB)">Wing Back (WB)</option>
                          <option value="Defensive Midfielder (DM)">
                            Defensive Midfielder (DM)
                          </option>
                          <option value="Central Midfielder (CM)">
                            Central Midfielder (CM)
                          </option>
                          <option value="Attacking Midfielder (AM)">
                            Attacking Midfielder (AM)
                          </option>
                          <option value="Winger (WG)">Winger (WG)</option>
                          <option value="Forward (FW)">Forward (FW)</option>
                          <option value="Striker (ST)">Striker (ST)</option>
                        </select>
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <label for="nation">Nation</label>
                        <select
                          name="nation"
                          id="nation"
                          required
                          value={nation}
                          onChange={onChangeNewPlayerForm}
                        >
                          <option value="" disabled selected>
                            Select Nation
                          </option>
                          {allNation.map((nation) => (
                            <option value={nation.name}>{nation.name}</option>
                          ))}
                        </select>
                      </fieldset>
                    </div>

                    <div class="col-lg-6">
                      <fieldset>
                        <label for="goals">Goals</label>
                        <input
                          value={goals}
                          onChange={onChangeNewPlayerForm}
                          type="number"
                          name="goals"
                          id="goals"
                          placeholder="Enter Player's Goals"
                          required
                          min="0"
                          max="1000"
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <div class="form-check form-switch">
                          <label for="captain">
                            Check if this player is captain
                          </label>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={isCaptain}
                            defaultChecked={isCaptain === "true"}
                            onChange={() => {
                              setNewPlayer({
                                ...newPlayer,
                                isCaptain: !isCaptain,
                              });
                            }}
                            id="captain"
                            name="isCaptain"
                          />
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="col-lg-12">
                    <label for="image">Your File</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <img src={url} height="255px" width="500px" />
                  </div>
                </div>
                <div class="col-lg-12">
                  <fieldset>
                    <label for="description">Description</label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={description}
                      onChange={onChangeNewPlayerForm}
                      placeholder="Description"
                      required
                    />
                  </fieldset>
                </div>
                <div class="col-lg-12">
                  <fieldset>
                    <button
                      type="submit"
                      id="form-submit"
                      class="orange-button"
                    >
                      Submit your updating
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

export default UpdatePlayer;
