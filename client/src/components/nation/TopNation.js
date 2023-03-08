import React from "react";

const TopPlayer = ({ nation }) => (
  <div class="item">
    <div class="thumb">
      <img
        src={nation.image}
        alt=""
        style={{ width: "75%", height: "580px", borderRadius: "20px" }}
      />
      <div class="hover-effect">
        <div class="content">
          <h4>{nation.name}</h4>
          <h6 className="mt-2">Rank: {nation.rank}</h6>
        </div>
      </div>
    </div>
  </div>
);
export default TopPlayer;
