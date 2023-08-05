import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Planner',
            tabBarIcon: ({ color }) => <TabBarIcon name="calendar-o" color={color} />,
            headerLeft:()=>(
              <AntDesign name="menuunfold" size={24} color="white" style={{padding:10}}/>
            ),
            headerStyle: { backgroundColor: '#007681' },
            headerTintColor: 'white',
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="camera-retro"
                      size={25}
                      color='white'
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
            
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Idea Center',
            headerStyle: { backgroundColor: '#007681' },
            headerTintColor: 'white',
            tabBarIcon: ({ color }) => <TabBarIcon name="lightbulb-o" color={color}/>,
          }}
        />
      </Tabs>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});