
import './App.css'
import { AuthProvider } from './providers/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import { useAuth } from './providers/AuthContext';
import Nav from './components/Nav'
import { useState } from 'react';

function App() {
   const { user } = useAuth();
   const [page,setPage] = useState(false)

   function handlePageChange (){
    setPage(prev => !prev)
   }
// console.log(user)
  return (
    <>
 
      <div>
      
      {!user && <LoginPage />}
      {user && <Nav handlePageChange={handlePageChange}/>}
      {user &&  !page &&  <Dashboard />} 
       {user && user.isAdmin && page && <AdminPage />}
      
    
      </div>
    
    </>
  ) 
}

export default App
