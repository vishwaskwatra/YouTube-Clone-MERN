import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import SearchResults from './pages/SearchResults';
import VideoPlayback from './pages/VideoPlayback';
import { UserProvider } from './context/UserContext'; 
import ChannelPage from './pages/ChannelPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route 
            path="/search" 
            element={
              <PrivateRoute>
                <SearchResults />
              </PrivateRoute>
            } 
          />
          <Route
            path="/video/:id"
            element={
              <PrivateRoute>
                <VideoPlayback />
              </PrivateRoute>
            }
          />
          <Route path="/channel" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
