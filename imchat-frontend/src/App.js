import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LoginPage from './pages/login/LoginPage';
import ChatPage from './pages/chat/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/chat" component={ChatPage} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
