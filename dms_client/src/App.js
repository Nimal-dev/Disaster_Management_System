import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SigninPage from "./components/SignIn";
import Signup from "./components/SignUp";
import AddState from "./components/Forms/Admin/AddState";
import EditState from "./components/Forms/Admin/EditState";
import AdminHome from "./components/HomePage/adminHome";
import StateHome from "./components/HomePage/stateHome";
import VolunteerHome from "./components/HomePage/volunteerHome";
import UserHome from "./components/HomePage/userHome";
import AddVolunteer from "./components/Forms/State/AddVolunteer";
import EditVolunteer from "./components/Forms/State/EditVolunteer";
import SOSPage from "./components/common/SOSPage";
import HelpRequestList from './components/Tables/HelpRequestList';
import VolunteerSignUp from "./components/VolunteerSignUp";
import ResourceRequestList from "./components/Tables/ResourceRequestList";
import Edituser from "./components/Forms/Admin/Edituser";

function App() {
  return (
    <BrowserRouter>
    <Routes>


{/* -----------------Auth Route Start------------------------ */}

      <Route path="/" element={<SigninPage/>}/>
      <Route path="/Signup" element={<Signup/>}/>

{/* -----------------Auth Route End------------------------ */}

      <Route path="/UserHome" element={<UserHome/>}/>


      <Route path="/AddState" element={<AddState/>}/>
      <Route path="/EditState" element={<EditState/>}/>


{/* -------------------------------------Home Page Routes----------------------------- */}

      <Route path="/AdminHome" element={<AdminHome/>}/>
      <Route path="/StateHome" element={<StateHome/>}/>
      <Route path="/VolunteerHome" element={<VolunteerHome/>}/>
      <Route path="/UserHome" element={<UserHome/>}/>

{/* -------------------------------------Home Page Routes----------------------------- */}

      <Route path="/VolunteerSignup" element={<VolunteerSignUp/>}/>
      <Route path="/AddVolunteer" element={<AddVolunteer/>}/>
      <Route path="/EditVolunteer" element={<EditVolunteer/>}/>
      <Route path="/Edituser" element={<Edituser/>}/>
      <Route path="/SOSPage" element={<SOSPage/>}/>

    
    
      <Route path="/HelpRequests" element={<HelpRequestList/>} />
      <Route path="/ResourceRequests" element={<ResourceRequestList/>} />




    </Routes>
    </BrowserRouter>
  );
}

export default App;
