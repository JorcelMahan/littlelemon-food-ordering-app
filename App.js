import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { NativeBaseProvider } from "native-base";


const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;