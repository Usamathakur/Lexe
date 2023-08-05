import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { AntDesign,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons'; 

const Study=()=>{
    return(
        <View>
            <View style={styles.study}>
            <AntDesign name="link" size={30} color="gray" />
            <AntDesign name="save" size={30} color="red" />
            <AntDesign name="lock" size={30} color="gray" />
            <AntDesign name="heart" size={30} color="red" />
      </View>
        <View style={styles.texts}>
            <Text style={styles.eachTexts}>Materials</Text>
            <Text style={styles.eachTexts}>Saved Tasks</Text>
            <Text style={styles.eachTexts}>Sub Done</Text>
            <Text style={styles.eachTexts}>Favorite Sub</Text>
      </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor:'#161818'
    },
    header: {
      margin:50,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color:'#eee',
      marginBottom:8
    },
    subtitle: {
      color:'gray',
      fontWeight:'500',
    },
    image:{
      width:'100%',
      height:300,
      borderRadius:20
    },
    study:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginVertical:20
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
  });

  export default Study;