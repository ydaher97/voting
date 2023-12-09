import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './providers/AuthContext';
import { MessageProvider } from './providers/MessageContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
  <MessageProvider>
    <App />
    </MessageProvider>
  </AuthProvider>
</React.StrictMode>,
)
