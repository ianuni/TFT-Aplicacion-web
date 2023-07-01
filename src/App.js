import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useAuth } from "./context/AuthContext";
import Invoices from "./pages/Invoices";
import AddInvoice from "./pages/AddInvoice";
import Invoice from "./pages/Invoice";
import Configuration from "./pages/Configuration";
import Inbox from "./pages/Inbox";
import Statistics from "./pages/Statistics";

function App() {
  const {currentUser, loading} = useAuth();


  const ProtectedRoute = ({children}) => {
    if(loading){
      return "Loading"
    }
    if(!currentUser){
      return <Navigate to="/signin"/>
    } 
    return (children);
    
  }

  return (
    
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}>
        <Route path="invoices">
          <Route index element={<Invoices/>}>
            
          </Route>
          <Route path="add" element={<AddInvoice/>}/>
          <Route path=":id" element={<Invoice/>}/>
        </Route>
        
        <Route path="inbox" element={<Inbox/>}/>
        <Route path="statistics" element={<Statistics/>}/>
        <Route path="profile" element={<Configuration/>}>

        </Route>
      </Route>
      <Route path="signin" element={<SignIn/>}/>
      <Route path="signup" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
