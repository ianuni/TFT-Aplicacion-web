import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useAuth } from "./context/AuthContext";
import InvoicePage from "./pages/Invoices";
import AddInvoice from "./pages/AddInvoice";
import Invoice from "./pages/Invoice";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import Statistics from "./pages/Statistics";
import ProfileDetails from "./pages/ProfileDetails";

function App() {
  const {currentUser} = useAuth();


  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/signin"/>
    } 
    return (children);
    
  }

  return (
    
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}>
        <Route index element={<InvoicePage/>}/>
        <Route path="invoices">
          <Route index element={<InvoicePage/>}/>
          <Route path="add" element={<AddInvoice/>}/>
          <Route path=":id" element={<Invoice/>}/>
        </Route>
        
        <Route path="inbox" element={<Inbox/>}/>
        <Route path="statistics" element={<Statistics/>}/>
        <Route path="profile" element={<Profile/>}>
          <Route index element={<ProfileDetails/>}/>
          <Route path="details" element={<ProfileDetails/>}/>
        </Route>
      </Route>
      <Route path="signin" element={<SignIn/>}/>
      <Route path="signup" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
