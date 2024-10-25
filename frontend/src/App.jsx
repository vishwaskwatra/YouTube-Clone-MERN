import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import SearchResults from './pages/SearchResults';
import VideoPlayback from './pages/VideoPlayback';
import { UserProvider } from './context/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider> {/* Wrap the application with UserProvider */}
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
                <SearchResults /> {/* New route for search results */}
              </PrivateRoute>
            } 
          />
          <Route
            path="/video/:id" // Route for video playback
            element={
              <PrivateRoute>
                <VideoPlayback />
              </PrivateRoute>
            }
          />
          {/* Other routes can go here */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
