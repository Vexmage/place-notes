// src/navigation/RootNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
