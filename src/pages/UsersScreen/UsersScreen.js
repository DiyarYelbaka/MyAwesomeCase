import { View, Text,StyleSheet,FlatList,Image,TouchableOpacity  } from 'react-native'
import React from 'react'
import CutsomHeader from '../../components/CutsomHeader'
import Colors from '../../styles/Colors';

const UsersScreen = () => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'First Item',
      active:false
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Second Item',
      active:true
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Third Item',
      active:true
    },
  ];
  const UserCard = ({item}) => (
    <TouchableOpacity style={styles.item}>
      <Image
       source={{uri:"https://this-person-does-not-exist.com/img/avatar-gen3abcf72b64f1aefb780b97fa077d1e82.jpg"}}
       style={styles.photo}
      />
      <Text style={styles.fullName}>{item.fullName}</Text>
      {
        item.active ?
       <Text style={styles.active} >Active</Text>
        :
       <Text style={styles.passive} >Passive</Text>
      }
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} >
      <Text style={styles.title} >Users</Text>
      <FlatList
        data={DATA}
        renderItem={({item}) => <UserCard item={item} />}
        keyExtractor={item => item.id}
      />
    </View> 
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.bg_color
  },
  title:{
    marginTop:50,
    fontWeight:'bold',
    fontSize:16,
    color:'#2A2A2E',
    alignSelf:'center'
  },
  item: {
    minHeight:76,
    marginHorizontal:10,
    backgroundColor:Colors.white,
    marginVertical:10,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:20,
    padding:10
  },
  photo:{
    width:50,
    height:50,
    borderRadius:50,
  },
  fullName:{
    marginLeft:10,
    fontSize:14,
    width:'50%'
  },
  active:{
    position:'absolute',
    right:20,
    paddingVertical:5,
    paddingHorizontal:15,
    borderRadius:20,
    color:'#12AA18',
    backgroundColor:'#D2FBD4',
  },
  passive:{
    position:'absolute',
    right:20,
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:20,
    color:'#FF6464',
    backgroundColor:'#FFF0F0',
  }
 
})
 
export default UsersScreen