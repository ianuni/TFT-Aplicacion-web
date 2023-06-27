import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useAuth } from "./context/AuthContext";
import Invoices from "./pages/Invoices";
import AddInvoice from "./pages/AddInvoice";
import Button from "./components/Button";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Invoice from "./pages/Invoice";

function App() {
  const {currentUser} = useAuth();
  console.log(currentUser)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/signin"/>
    } 
    return (children);
    
  }

  return (
    
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}>
        <Route path="invoices">
          <Route index element={<Invoices/>}/>
          <Route path="add" element={<AddInvoice/>}/>
          <Route path=":id" element={<Invoice/>}/>
        </Route>
        <Route path="contacts" element={<Home/>}></Route>
        <Route path="inbox" element={<Home/>}/>
        <Route path="statistics" element={<Home/>}/>
        <Route path="profile" element={<Button onClick={() => signOut(auth)}>Sign Out</Button>}/>
      </Route>
      <Route path="signin" element={<SignIn/>}/>
      <Route path="signup" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
