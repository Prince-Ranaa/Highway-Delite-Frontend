import './App.css';
import SignUpComponent from './components/signup/signup';
import SignInComponent from './components/signin/signin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardComponent from './components/dashboard/dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardComponent />} />
        <Route path="/signin" element={<SignInComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
