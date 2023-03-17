import React, { useContext, useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { NavLink, useLocation } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext";
import { Carousel, Empty, Select } from "antd";
import SinglePlayer from "./SinglePlayer";
import TopPlayer from "./TopPlayer";
import { NationContext } from "../../contexts/NationContext";
import { AuthContext } from "../../contexts/AuthContext";
import Search from "antd/es/transfer/search";

const Player = () => {
  const { pathname } = useLocation();

  const {
    playerState: { players, playersLoading },
    getPlayers,
  } = useContext(PlayerContext);
  const [search, setSearch] = useState("");
  const [searchNation, setSearchNation] = useState("");

  const {
    authState: {
      user: { isAdmin },
    },
  } = useContext(AuthContext);
  const {
    getNations,
    nationState: { nations },
  } = useContext(NationContext);
  // Start: Get All nationss
  useEffect(() => {
    getNations();
    console.log();
  }, []);
  // Start: Get All playerss
  useEffect(() => {
    getPlayers();
  }, []);
  let body;
  if (players.length === 0) {
    body = <Empty />;
  } else if (searchNation !== "" && searchNation !== "All Nation") {
    if (searchNation !== "All Nation")
      body = players
        .filter((i) => i.category === searchNation)
        .map((player) => <SinglePlayer player={player} />);
  } else if (search !== "") {
    let charMap = {
      a: "a",
      à: "a",
      á: "a",
      ạ: "a",
      ả: "a",
      ã: "a",
      ă: "a",
      ằ: "a",
      ắ: "a",
      ặ: "a",
      ẳ: "a",
      ẵ: "a",
      â: "a",
      ầ: "a",
      ấ: "a",
      ậ: "a",
      ẩ: "a",
      ẫ: "a",
      d: "d",
      đ: "d",
      e: "e",
      è: "e",
      é: "e",
      ẹ: "e",
      ẻ: "e",
      ẽ: "e",
      ê: "e",
      ề: "e",
      ế: "e",
      ệ: "e",
      ể: "e",
      ễ: "e",
      i: "i",
      ì: "i",
      í: "i",
      ị: "i",
      ỉ: "i",
      ĩ: "i",
      o: "o",
      ò: "o",
      ó: "o",
      ọ: "o",
      ỏ: "o",
      õ: "o",
      ô: "o",
      ồ: "o",
      ố: "o",
      ộ: "o",
      ổ: "o",
      ỗ: "o",
      ơ: "o",
      ờ: "o",
      ớ: "o",
      ợ: "o",
      ở: "o",
      ỡ: "o",
      u: "u",
      ù: "u",
      ú: "u",
      ụ: "u",
      ủ: "u",
      ũ: "u",
      ư: "u",
      ừ: "u",
      ứ: "u",
      ự: "u",
      ử: "u",
      ữ: "u",
      y: "y",
      ỳ: "y",
      ý: "y",
      ỵ: "y",
      ỷ: "y",
      ỹ: "y",
    };

    body = players
      .filter((i) =>
        i.name
          .toLowerCase()
          .replace(/\s/g, "")
          .replace(/./g, function (char) {
            return charMap[char] || char;
          })
          .includes(
            search
              .toLowerCase()
              .replace(/\s/g, "")
              .replace(/./g, function (char) {
                return charMap[char] || char;
              })
          )
      )
      .map((player) => <SinglePlayer player={player} />);
  } else {
    body = players.map((player) => <SinglePlayer player={player} />);
  }

  const onSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  function handleScroll(event) {
    event.preventDefault();
  }

  return (
    <div>
      <div class="page-heading">
        {!isAdmin && (
          <div class="featured-explore">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <h2 className="mb-5">Top 5 Phones' Popular 2022</h2>

                  {players.length !== 0 ? (
                    <Carousel effect="fade" autoplay autoplaySpeed={2500}>
                      {players
                        .sort((a, b) => a.goals - b.goals)
                        .reverse()
                        .slice(0, 5)
                        .map((player) => (
                          <TopPlayer player={player} />
                        ))}
                    </Carousel>
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div class="discover-items">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="section-heading">
                <div class="line-dec"></div>
                {isAdmin ? (
                  <h2>
                    <em>Phone</em> Management
                  </h2>
                ) : (
                  <h2>
                    The Smart Phone in 2022 <em>Phones' Popular</em>
                  </h2>
                )}
              </div>
            </div>
            <div class="col-lg-2" style={{ alignSelf: "center" }}>
              <Select
                name="nation"
                className="selectNation"
                value={searchNation}
                onChange={(e) => setSearchNation(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                <option value="All Nation">All Category</option>
                {nations.map((nation) => (
                  <option value={nation._id}>{nation.name}</option>
                ))}
              </Select>
              {/* <Select
                onScroll={handleScroll}
                onTouchMove={handleScroll}
                defaultValue="Nation"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={nations.map((i) => ({ value: i.name, label: i.name }))}
              /> */}
            </div>
            <div
              class="col-lg-3"
              style={{ alignSelf: "center", marginLeft: "30px" }}
            >
              <Search
                placeholder="Search by phone name"
                allowClear
                enterButton="Search"
                onChange={onSearch}
              />
            </div>
            <div class="col-lg-3">
              <div class="buttons" style={{ textAlign: "right" }}>
                <div class="main-button">
                  {isAdmin && (
                    <NavLink
                      to="/addPlayer"
                      class="explore"
                      isActive={() => ["/players"].includes(pathname)}
                      style={{ marginTop: "15px" }}
                    >
                      Create new phone
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
