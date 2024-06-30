import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ChatPage from './Pages/ChatPage.js';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<ChatPage />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
