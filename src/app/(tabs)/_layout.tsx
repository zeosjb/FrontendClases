import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';


export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#e91e63', tabBarShowLabel: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: 'For You',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={28} color={color} />
                    ),
                }} />

            <Tabs.Screen
                name="new"
                options={{
                    headerTitle: 'New Post',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="add-circle-outline" size={28} color={color} />
                    ),
                }} />
            
            <Tabs.Screen
                name="profile"
                options={{
                    headerTitle: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={28} color={color} />
                    ),
                }} />
        </Tabs>
    )
}