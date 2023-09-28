import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './components/navigator/StackNavigator.js';
import { Provider } from "react-redux";
import { Store } from "./store/Store.js";

export default function App() {
  return (
      <Provider store={Store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
  );
}
