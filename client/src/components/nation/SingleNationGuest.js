import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popconfirm } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { NationContext } from "../../contexts/NationContext";

const SinglePlayerGuest = ({ nation }) => {
  const { deleteNation, setShowToast } = useContext(NationContext);
  const position = nation.position + "";
  const regExp = /\(([^)]+)\)/g;
  const matches = [...position.matchAll(regExp)].flat();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = () => {
    deleteNation(nation._id);
    setShowToast({
      show: true,
      message: "Delete Successsfully",
      type: "success",
    });
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div class="col-lg-3">
      <div class="item">
        <div className="row mb-3">
          <div class="col-2 ">
            <p>Rank</p>
          </div>
          <div class="col-8 ">
            <p className="ranking"> {nation.rank}</p>
          </div>
          <div class="col-2"></div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <span class="author"></span>
            <img
              src={nation.image}
              alt=""
              style={{ borderRadius: "20px", width: "100%", height: "150px" }}
            />
            <h4
              style={{
                textAlign: "center",
                marginTop: "12px",
                overflowWrap: "break-word",
              }}
            >
              {nation.name}
            </h4>
          </div>

          <div class="col-lg-12">
            <div class="main-button" style={{ marginTop: "15px" }}>
              <Link
                to={`/nations/${nation._id}`}
                style={{ fontSize: "12px", padding: "5px 15px" }}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerGuest;
