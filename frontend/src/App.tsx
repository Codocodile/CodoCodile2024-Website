import "./App.css";
import Landing from "./components/landing/Landing.tsx";
import Panel from "./components/panel/Panel.tsx";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/signIn/SignIn.tsx";
import {urls} from "./global-constants/Variables.ts";
import Profile from "./components/profile/Profile.tsx";
import Team from "./components/team/Team.tsx";
import PasswordReset from "./components/password-reset/PasswordReset.tsx";
import ForgetPassword from "./components/password-reset/ForgetPassword.tsx";
import SignUp from "./components/signUp/SignUp.tsx";
import Visit from "./components/visit/visit.tsx";
import {useLocation} from "react-router-dom";
import Sponsor from "./components/sponsor/Sponsor.tsx";

function App() {
    const location = useLocation()
    return (
        <div className="App">
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path={urls.signIn} element={<SignIn/>}/>
                <Route path={urls.signUp} element={<SignUp/>}/>
                <Route path={urls.passwordReset} element={<PasswordReset/>}/>
                <Route path={urls.sponsor} element={<Sponsor/>}/>
                <Route path={urls.forgetPassword} element={<ForgetPassword/>}/>
                <Route path={urls.panel} element={<Panel/>}>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="team" element={<Team/>}/>
                </Route>
                <Route path={"*"} element={<Visit pathName={location.pathname}/>}/>
            </Routes>
        </div>
    );
}

export default App;
