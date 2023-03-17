import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popconfirm } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { NationContext } from "../../contexts/NationContext";

const SingleNation = ({ nation }) => {
  const {
    authState: {
      user: { isAdmin },
    },
  } = useContext(AuthContext);
  const { deleteNation, setShowToast } = useContext(NationContext);
  const position = nation.position + "";
  const regExp = /\(([^)]+)\)/g;
  const matches = [...position.matchAll(regExp)].flat();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    const data = await deleteNation(nation._id);
    console.log(data);
    if (data.success === false)
      setShowToast({
        show: true,
        message: data.message,
        type: "error",
      });
    else
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
            <p>Brand</p>
          </div>
          <div class="col-8 ">
            {" "}
            <p
              className="text-end"
              style={{ fontFamily: "fantasy", fontSize: "22px" }}
            >
              {nation.name}
            </p>
          </div>
          <div class="col-2">
            {isAdmin && (
              <Popconfirm
                title="Warning"
                description="Are you sure to delete this category?"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{
                  loading: confirmLoading,
                }}
                onCancel={handleCancel}
              >
                <a onClick={showPopconfirm} className="cancel">
                  <FontAwesomeIcon icon={faXmark} style={{ color: "white" }} />
                </a>
              </Popconfirm>
            )}
          </div>
        </div>
        <div class="row">
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

export default SingleNation;
