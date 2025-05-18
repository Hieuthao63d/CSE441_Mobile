// //drawer

// import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import React from 'react';
// import 'react-native-gesture-handler';

// import ContactsWithAsyncStorage from './screens/ContactsWithAsyncStorage';
// import FavoritesWithAsyncStorage from './screens/FavoritesWithAsyncStorage';
// import ProfileContactWithAsyncStorage from './screens/ProfileContactWithAsyncStorage';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// function ContactsStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="ContactsList"
//         component={ContactsWithAsyncStorage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ProfileContact"
//         component={ProfileContactWithAsyncStorage}
//         options={{ title: 'Profile' }}
//       />
//     </Stack.Navigator>
//   );
// }

// function FavoritesStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="FavoritesList"
//         component={FavoritesWithAsyncStorage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ProfileContact"
//         component={ProfileContactWithAsyncStorage}
//         options={{ title: 'Profile' }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default function AppWithAsyncStorage() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         initialRouteName="Contacts"
//         screenOptions={{
//           headerStyle: { backgroundColor: '#3366CC' },
//           headerTintColor: 'white',
//           drawerActiveTintColor: '#3366CC',
//         }}
//       >
//         <Drawer.Screen
//           name="Contacts"
//           component={ContactsStack}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="account-multiple" color={color} size={24} />,
//           }}
//         />
//         <Drawer.Screen
//           name="Favorites"
//           component={FavoritesStack}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="star" color={color} size={24} />,
//           }}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
// with Tab

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import Contacts from './screens/Contacts';
import Favorites from './screens/Favorites';
import ProfileContact from './screens/ProfileContact';
import store from './store';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function ContactsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactsList"
        component={Contacts}
        options={{ title: 'Contacts' }}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesList"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Contacts"
          barStyle={{ backgroundColor: '#3366CC' }}
          activeColor="white"
          inactiveColor="lightgray"
        >
          <Tab.Screen
            name="Contacts"
            component={ContactsStack}
            options={{
              tabBarIcon: ({ color }) => <Icon name="account-multiple" color={color} size={26} />,
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesStack}
            options={{
              tabBarIcon: ({ color }) => <Icon name="star" color={color} size={26} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}