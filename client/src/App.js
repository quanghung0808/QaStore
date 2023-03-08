import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import HomeUser from "./views/HomeUser";
import PlayerView from "./views/PlayerView";
import AddPlayerView from "./views/AddPlayerView";
import PlayerContextProvider from "./contexts/PlayerContext";
import PlayerDetailView from "./views/PlayerDetailView";
import UpdatePlayerView from "./views/UpdatePlayerView";
import NationView from "./views/NationView";
import NationContextProvider from "./contexts/NationContext";
import AddNationView from "./views/AddNationView";
import NationDetailView from "./views/NationDetailView";
import ProtectedAdminRoute from "./components/routing/ProtectedAdminRoute";
import ProfileView from "./views/ProfileView";
import ManageUserView from "./views/ManageUserView";
import UpdateNationView from "./views/UpdateNationView";
function App() {
  return (
    <AuthContextProvider>
      <PlayerContextProvider>
        <NationContextProvider>
          <Router>
            <Routes>
              <Route exact path="*" element={<Auth />} />
              <Route
                path="/home"
                element={<ProtectedRoute component={HomeUser} />}
              />

              <Route path="/players" element={<PlayerView />} />
              <Route
                path="/addPlayer"
                element={<ProtectedAdminRoute component={AddPlayerView} />}
              />
              <Route
                exact
                path="/players/:_id"
                element={<PlayerDetailView />}
              />
              <Route
                path="/players/update/:_id/"
                element={<ProtectedAdminRoute component={UpdatePlayerView} />}
              />
              <Route path="/nations" element={<NationView />} />
              <Route
                path="/addNation"
                element={<ProtectedAdminRoute component={AddNationView} />}
              />
              <Route path="/nations/:_id" element={<NationDetailView />} />
              <Route
                path="/nations/update/:_id"
                element={<ProtectedAdminRoute component={UpdateNationView} />}
              />
              <Route
                path="/profile/"
                element={<ProtectedRoute component={ProfileView} />}
              />
              <Route
                path="/users"
                element={<ProtectedRoute component={ManageUserView} />}
              />
            </Routes>
          </Router>
        </NationContextProvider>
      </PlayerContextProvider>
    </AuthContextProvider>
  );
}

export default App;
