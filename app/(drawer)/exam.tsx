import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import menuOptions from "../../assets/menuOptions";
import MenuOptions from "../../components/MenuOptions";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
        <Text style={styles.title}>Competitive Exams</Text>
        <Text style={styles.subtitle}>Preparation</Text>
        </View>
        <Feather name="user" size={30} color="gray" />
      </View>
      <Image source={{uri:"https://i.pinimg.com/564x/35/b8/82/35b882eba018651699fc9774683c63b2.jpg"}} style={styles.image}
      resizeMode='contain'/>
      <FlatList data={menuOptions}
      showsVerticalScrollIndicator={false}
      renderItem={MenuOptions}
      />
    </View>
  );
};

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
    height:150,
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
