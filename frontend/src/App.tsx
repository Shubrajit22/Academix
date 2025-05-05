import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Signin from './components/Signin';
import Home from './components/Home';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Signup from './components/Signup';


const App = () => {
  

  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
    </Routes>
  </BrowserRouter>
  );
};
export default App;
