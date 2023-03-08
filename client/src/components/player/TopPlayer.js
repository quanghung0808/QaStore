import React from "react";

const TopPlayer = ({ player }) => (
  <div class="item">
    <div class="thumb">
      <img
        src={player.image}
        alt=""
        style={{ width: "75%", height: "580px", borderRadius: "20px" }}
      />
      <div class="hover-effect">
        <div class="content">
          <h4>{player.name}</h4>
          <span class="author">
            <h6 className="mt-2">Goals: {player.goals}</h6>
          </span>
        </div>
      </div>
    </div>
  </div>
);
export default TopPlayer;
