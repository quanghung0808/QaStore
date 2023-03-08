import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from ".././firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NationContext } from "../../contexts/NationContext";

const UpdateNation = () => {
  const [api, contextHolder] = notification.useNotification();

  const {
    nationState: { nation },
    findNation,
    updateNation,
    setShowToast,
  } = useContext(NationContext);
  const currentURL = window.location.pathname.slice(16); // returns the absolute URL of a page
  console.log(currentURL);
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const [newNation, setNewNation] = useState({
    name: nation.name,
    rank: nation.rank,
    description: nation.description,
  });
  useEffect(() => {
    findNation(currentURL);
    const data = localStorage.getItem("NationDetail");
    console.log(data);
    setNewNation(JSON.parse(data));
    setUrl(JSON.parse(data).image);
  }, []);

  const { name, rank, description } = newNation;
  const onChangeNewNationForm = (event) => {
    setNewNation({ ...newNation, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (image !== null) {
        uploadImg().then(async (ref) => {
          const { success, message } = await updateNation(
            newNation,
            ref,
            currentURL
          );
          setShowToast({
            show: true,
            message,
            type: success ? "success" : "error",
          });
          if (success) {
            navigate("/nations");
          } else {
            api.error({
              message,
              placement: "bottomRight",
            });
          }
        });
      } else {
        const { success, message } = await updateNation(
          newNation,
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
          navigate("/nations");
        } else {
          api.error({
            message,
            placement: "bottomRight",
          });
        }
      }
    } catch (error) {}
  };

  const uploadImg = () => {
    // Return a promise that will either resolve or emit an error
    return new Promise((resolve, reject) => {
      console.log("Uploading image ...");
      const imageRef = ref(storage, `images/${image.name}`);
      const put = uploadBytes(imageRef, image).then(async () => {
        const ref = await getDownloadURL(imageRef);
        console.log("uploaded: " + ref);
        setImage(ref);
        resolve(ref);
      });
    });
  };
  return (
    <>
      {contextHolder}
      <div class="item-details-page">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div
                class="section-heading"
                style={{ marginBottom: "60px", marginTop: "40px" }}
              >
                <h2>
                  Apply For <em>Your Item</em> Here.
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
                          onChange={onChangeNewNationForm}
                          pattern="[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{1,40}"
                          title="Not accept number and special character, min length is 1. max length is 40"
                          id="name"
                          placeholder="Nation Name"
                          required
                        />
                      </fieldset>
                    </div>

                    <div class="col-lg-12">
                      <fieldset>
                        <label for="rank">Rank</label>
                        <input
                          value={rank}
                          onChange={onChangeNewNationForm}
                          type="number"
                          name="rank"
                          id="rank"
                          placeholder="Enter Nation's rank"
                          required
                          min="0"
                          max="1000"
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <label for="description">Description</label>
                        <textarea
                          type="text"
                          multiline
                          name="description"
                          id="description"
                          value={description}
                          onChange={onChangeNewNationForm}
                          placeholder="Description"
                          required
                        />
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

export default UpdateNation;
