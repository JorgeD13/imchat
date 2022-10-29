import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LoginPage from './pages/login/LoginPage';
import ChatPage from './pages/chat/ChatPage';
import RegisterPage from './pages/register/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/chat" component={ChatPage} />
        <Route exact path="register" component={RegisterPage} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
