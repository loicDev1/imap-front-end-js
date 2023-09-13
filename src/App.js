import { Provider } from "react-redux";
import { store } from "./redux/redux";
import  Dashboard  from "./components/Dashboard";
import { protectComponentAcces } from "./helpers/utils";

function App() {
  return (
      <div>
        <Provider store={store}>
          {protectComponentAcces(<Dashboard />)}
        </Provider>
        
      </div>
  );
}

export default App;
