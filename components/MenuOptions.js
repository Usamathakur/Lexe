import {Text, View,StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons'; 
import { Link } from "expo-router";
const MenuOptions=({item})=>{
    return(
        <Link href={item.href} asChild>
      <Pressable style={styles.studyOptionRow}>
            <MaterialCommunityIcons name={item.iconName} size={26} color='red'/>
            <Text style={styles.studyOptionText}>{item.name}</Text>
            <FontAwesome name='arrow-right' size={26} color='gray'
            style={{marginLeft:'auto'}}/>
          </Pressable>
          </Link>
    )
  }

  const styles = StyleSheet.create({
    studyOptionRow:{
      flexDirection:'row',
      marginVertical:20,
      alignItems:'center'
    },
    eachTexts:{
      color:'#eee',
      fontWeight:'500',
      flex:1,
      marginLeft:10
    },
    texts:{
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center'
      
    },
    studyOptionText:{
      color:'#eee',
      fontSize:18,
      fontWeight:'bold',
      marginLeft:10
    }
  });

  export default MenuOptions;