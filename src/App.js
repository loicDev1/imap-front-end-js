import { Provider } from "react-redux";
import { store } from "./redux/redux";
import  Dashboard  from "./components/Dashboard";

function App() {
  return (
      <div>
        <Provider store={store}>
          <Dashboard />
        </Provider>
        
      </div>
  );
}

export default App;
