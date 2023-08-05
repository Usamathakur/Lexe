import { Stack, withLayoutContext } from "expo-router";
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} >
        <Text style={{fontWeight:'500',fontSize:16,padding:10,color:"white"}}>SDI</Text>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
export default function DrawerLayout(){
    return(
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="(tabs)" options={{headerShown:false,title:'Home'}}/>
          <Drawer.Screen name="exam" options={{title:'Competitive Exam Prep',headerStyle: {
            backgroundColor: '#007681'
          },headerTintColor: '#fff',}}/>
          <Drawer.Screen name="tools" options={{title:'Other Tools',headerStyle: {
            backgroundColor: '#007681'
          },headerTintColor: '#fff',}}/>
        </Drawer>
    )
}