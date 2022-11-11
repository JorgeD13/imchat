import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LoginPage from './pages/login/LoginPage';
import ChatPage from './pages/chat/ChatPage';
import RegisterPage from './pages/register/RegisterPage';
import RouteGuard from "./redux/RouteGuard";

function App() {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            {/* <Route path="/chat"
                element={
                    <RouteGuard>
                        <ChatPage />
                    </RouteGuard>
                }
            /> */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
