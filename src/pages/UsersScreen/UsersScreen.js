import { View, Text,StyleSheet,FlatList,Image,TouchableOpacity,RefreshControl,Platform,Animated} from 'react-native'
import React,{useEffect,useState,useRef} from 'react'
import Colors from '../../styles/Colors';
import { get } from '../../services/api';
import ListEmptyComponent from '../../components/ListEmptyComponent';


const UsersScreen = ({navigation,route}) => {



const [data, setData] = useState({})
const [refreshing, setRefreshing] = useState(false);
const {onRefresh} = route.params || false


const opacity = useRef(new Animated.Value(0)).current;
const translateYValue = useState(new Animated.Value(100))[0];

useEffect(()=>{
  getUserData()
},[onRefresh])


useEffect(() => {
  Animated.timing(opacity, {
    toValue: 1,
    duration: 1500, 
    useNativeDriver: true,
  }).start();
  Animated.timing(translateYValue, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  }).start();
}, []);

async function handleRefresh(){
  opacity.setValue(1);
  translateYValue.setValue(1);
  await getUserData()
}


  const getUserData= async()=>{
    try {
      const getResponse = await get('/users');
      setData(getResponse.response)

    } catch (error) {
      console.error('Error:', error);

   }
  }
 
  const UserCard = ({item}) =>(
    <Animated.View style={[{ opacity },{ transform: [{ translateY: translateYValue }] }]}>
    <TouchableOpacity 
    style={styles.item} 
    onPress={()=>navigation.navigate('editUserScreen',{isEdit: true,userInfo:item})}
    >
      <Image
       source={require('../../assets/image/profile_image.png')}
       style={styles.photo}
      />
      <Text style={styles.fullName}>{item.user_fullname}</Text>
      {
        item.user_status === 'Active' ?
       <Text style={styles.active} >Active</Text>
        :
       <Text style={styles.passive} >Passive</Text> 
      } 
    </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container} >
      <Text style={styles.title} >Users</Text>
        <FlatList
        data={data}
        renderItem={({item}) => <UserCard item={item} />}
        keyExtractor={item => item.user_id}
        contentContainerStyle={{paddingBottom:90}}
        ListEmptyComponent={() => (
          <ListEmptyComponent/>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefresh()}
          />
        }
      />
    
    </View> 
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.bg_color,
    flex:1
  },
  title:{
    marginTop: Platform.OS === 'ios' ? 60 : 50,
    fontWeight:'bold',
    fontSize:16,
    color:'#2A2A2E',
    alignSelf:'center',
    marginBottom:25,
  },
  item: {
    minHeight:76,
    marginHorizontal:20,
    backgroundColor:Colors.white,
    marginVertical:10,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:20,
    padding:10,
  },
  photo:{
    width:50,
    height:50,
    borderRadius:50,
  },
  fullName:{
    marginLeft:10,
    fontSize:14,
    width:'50%',
    fontFamily:'PlusJakartaSans',
  },
  active:{
    position:'absolute',
    right:20,
    paddingVertical:5,
    paddingHorizontal:15,
    borderRadius:15,
    color:'#12AA18',
    backgroundColor:'#D2FBD4',
    overflow:'hidden'
  },
  passive:{
    position:'absolute',
    right:20,
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:15,
    color:'#FF6464',
    backgroundColor:'#FFF0F0',
    overflow:'hidden'
  }
 
})
 
export default UsersScreen