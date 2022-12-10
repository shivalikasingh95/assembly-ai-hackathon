import "./App.css";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import AppHeader from "./components/AppHeader";
// Page / route import
import DashboardIndex from "./pages/DashboardIndex";
import ComposeLyricIndex from "./pages/ComposeLyricIndex";
import ComposeAlbumIndex from "./pages/ComposeAlbumIndex";
import ComposeBgMusicIndex from "./pages/ComposeBgMusicIndex";

function App() {
  return (
    <div className="app-root">
      <Router>
        <div className="app-header-root">
          <AppHeader />
        </div>
        <div className="app-content-root">
          <Routes>
            <Route exact path="/" element={<DashboardIndex />} />
            <Route path="/compose-lyric" element={<ComposeLyricIndex />} />
            <Route path="/compose-album" element={<ComposeAlbumIndex />} />
            <Route path="/compose-bgmusic" element={<ComposeBgMusicIndex />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
