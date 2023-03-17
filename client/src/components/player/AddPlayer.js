import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";
import { storage } from ".././firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NationContext } from "../../contexts/NationContext";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddPlayer = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  //contexts
  const { addPlayer, setShowToast } = useContext(PlayerContext);

  const {
    nationState: { nations },
    getNations,
  } = useContext(NationContext);

  useEffect(() => {
    getNations();
    // eslint-disable-next-line
  }, []);

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    price: "0",
    category: "",
    os: "",
    size: "0",
    pin: "0",
    ram: "0",
    description: "",
  });
  const { name, price, category, os, size, pin, ram, description } = newPlayer;
  const onChangeNewPlayerForm = (event) => {
    setNewPlayer({ ...newPlayer, [event.target.name]: event.target.value });
  };
  console.log(newPlayer);
  const onSubmit = async (event) => {
    event.preventDefault();
    uploadImg().then(async (ref) => {
      const { success, message } = await addPlayer(newPlayer, ref);
      setShowToast({
        show: true,
        message,
        type: success ? "success" : "error",
      });

      if (success) {
        navigate("/players");
      }
    });
  };

  const uploadImg = () => {
    // Return a promise that will either resolve or emit an error
    return new Promise((resolve, reject) => {
      console.log("Uploading image ...");
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image).then(async () => {
        const ref = await getDownloadURL(imageRef);
        console.log("uploaded: " + ref);
        setImage(ref);
        resolve(ref);
      });
    });
  };

  return (
    <>
      <div className="item-details-page">
        <div className="container">
          <div className="row">
            <Button style={{ width: "100px" }}>
              <Link to="/players">
                Back
                <FontAwesomeIcon icon={faArrowLeft} className="" />
              </Link>
            </Button>
            <div className="col-lg-12">
              <div
                className="section-heading"
                style={{ marginBottom: "60px", marginTop: "40px" }}
              >
                <h2>
                  Creating <em>New Player</em> Here.
                </h2>
              </div>
            </div>
            <form id="contact" onSubmit={onSubmit}>
              <div className="col-lg-12">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-12">
                      <fieldset>
                        <label for="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={onChangeNewPlayerForm}
                          // pattern="^[^0-9]+$"
                          title="Not accept number"
                          minLength={1}
                          maxLength={40}
                          id="name"
                          placeholder="Player Name"
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-lg-12">
                      <fieldset>
                        <label for="price">Price</label>
                        <input
                          value={price}
                          onChange={onChangeNewPlayerForm}
                          type="number"
                          name="price"
                          id="price"
                          placeholder="Enter Player's price"
                          required
                          // min="0"
                          // max="1000"
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label for="category">Category</label>
                        <select
                          name="category"
                          id="category"
                          required
                          value={category}
                          onChange={onChangeNewPlayerForm}
                        >
                          <option value="" disabled selected>
                            Select category
                          </option>
                          {nations.map((nation) => (
                            <option value={nation._id}>{nation.name}</option>
                          ))}
                        </select>
                      </fieldset>
                    </div>
                    <div className="col-lg-6">
                      <fieldset>
                        <label for="os">Operating System</label>
                        <select
                          name="os"
                          id="os"
                          required
                          value={os}
                          onChange={onChangeNewPlayerForm}
                        >
                          <option value="" disabled selected>
                            Select Operating System
                          </option>
                          <option value="Android">Android</option>
                          <option value="Ios">Ios</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="col-lg-6">
                      <fieldset>
                        <label for="size">Size</label>
                        <input
                          value={size}
                          onChange={onChangeNewPlayerForm}
                          type="number"
                          name="size"
                          id="size"
                          placeholder="Enter Screen's size"
                          required
                          // min="0"
                          // max="1000"
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6">
                      <fieldset>
                        <label for="pin">Pin</label>
                        <input
                          value={pin}
                          onChange={onChangeNewPlayerForm}
                          type="number"
                          name="pin"
                          id="pin"
                          placeholder="Enter Phone's pin"
                          required
                          // min="0"
                          // max="1000"
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6">
                      <fieldset>
                        <label for="ram">Ram</label>
                        <input
                          value={ram}
                          onChange={onChangeNewPlayerForm}
                          type="number"
                          name="ram"
                          id="ram"
                          placeholder="Enter Phone's ram"
                          required
                          min="0"
                          max="1000"
                        />
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="col-lg-12">
                    <label for="image">Your File</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      required
                      onChange={handleChange}
                    />
                    <img src={url} height="345px" width="500px" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <label for="description">Description</label>
                    <textarea
                      type="text"
                      multiline
                      name="description"
                      id="description"
                      value={description}
                      onChange={onChangeNewPlayerForm}
                      placeholder="Description"
                      required
                      style={{ height: "100px !important" }}
                    />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <button
                      type="submit"
                      id="form-submit"
                      className="orange-button"
                    >
                      Submit Your Creating
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

export default AddPlayer;
