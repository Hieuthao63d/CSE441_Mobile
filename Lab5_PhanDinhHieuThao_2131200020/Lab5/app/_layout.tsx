import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="services/[id]"
        options={{
          title: 'Service detail',
          headerStyle: { backgroundColor: '#ef476f' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="services/[id]/edit"
        options={{
          title: 'Service',
          headerStyle: { backgroundColor: '#ef476f' },
          headerTintColor: '#fff',
        }}
      />

    </Stack>
  );
}
