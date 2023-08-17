import { View,Text, StyleSheet, ScrollView, Image,Alert} from 'react-native'
import React, {useState} from 'react'
import CutsomHeader from '../../components/CutsomHeader'
import { useForm } from "react-hook-form";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';
import { post, updateUser } from '../../services/api';
import { showMessage} from "react-native-flash-message";
import SelectDropdown from 'react-native-select-dropdown'
import Colors from '../../styles/Colors';
import ArrowIcon from '../../assets/svg/bottom_arrow.svg'

const CreateUserScreen = ({ navigation, route }) => {
    const { isEdit } = route.params || false
    const { userInfo } = route.params || {}
    
    const [loading,setLoading] = useState(false)
    const [loadingDelete,setLoadingDelete] = useState(false)
    
    const [isModalVisible, setModalVisible] = useState(false)
    const [onDelete, setOnDelete] = useState(false)

    const userStatus = [
        "Active",
        "Passive",
      ]
      const [onUserStatus, setOnUserStatus] = useState(userInfo?.user_status);
      console.log(userInfo?.user_status)

    const { handleSubmit, control, formState: { errors }, watch,reset } = useForm({
        defaultValues:{
            fullName: isEdit ? userInfo?.user_fullname : '',
            email: isEdit ? userInfo?.user_email : '',
            phoneNumber: isEdit ? userInfo?.user_phone : '',
        }
    });

    const randomNumber = Math.floor(Math.random() * 100) + 1;
  


   async function handleAdd(data){

    if(!onUserStatus) return Alert.alert('Ops','Please select status')

    setLoading(true)
    const { fullName,email, password,phoneNumber } = data;
    console.log(fullName,email,password,phoneNumber)
    const postData = { 
        user_fullname:fullName,
        user_email:email,
        user_password:'123456',
        user_phone:phoneNumber,
        user_status:onUserStatus
      };
      try {
        const getResponse = await post('/users/new',postData);
        navigation.navigate('usersScreen',{onRefresh:randomNumber})
        setLoading(false)
        showMessage({
            message: "Congratulations",
            description: "You have successfully created a user",
            type: "success",
          });
          reset()
        console.log('GET Response:', getResponse);
       
      } catch (error) {
        setLoading(false)
        showMessage({
            message: "Ops",
            description: "Please try again",
            type: "danger",
          });
        console.error('Error:', error);
        //console.error('Error:', error.response.data.response);
     }
    }
    
   async function handleUpdate(data){
    setLoading(true)
        const { fullName,phoneNumber,email } = data;
        console.log(fullName,email,phoneNumber)
        const postData = { 
            user_id: userInfo?.user_id,
            user_fullname:fullName,
            user_email:email,
            user_phone:phoneNumber,
            user_password:userInfo?.user_password,
            user_status:onUserStatus
            
          };
          try {
            const getResponse   = await updateUser(userInfo?.user_id,postData);
         //   navigation.navigate('usersScreen',{onRefresh:randomNumber})
            setLoading(false)
            setOnDelete(false)
            setModalVisible(true)
            console.log('GET Response:', getResponse);
          } catch (error) {
            showMessage({
                message: "Ops",
                description: "Please try again",
                type: "danger",
              });
            setLoading(false)
            console.error('Error:', error);
            
          //  console.error('Error:', error.response.data.errorCode);
         }
    }

    async function handleDelete(){ 
        setOnDelete(true)
        setModalVisible(true)
    }

    return (
        <ScrollView>
            <CutsomHeader title={ isEdit ? 'Edit User' : 'Create User'} onPress={() => navigation.goBack()} />

            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/image/profile_image.png')}
                    style={styles.image}
                />

            </View>
            <View style={styles.inputContainer}  >
                <CustomInput
                    title={'Full Name'}
                    visiblePassword={false}
                    control={control}
                    name={'fullName'}
                    rules={{
                        required: 'Please enter username.',
                        minLength: {
                            value: 1,
                            message: 'Invalid username.'
                        },
                    }}
                    secureTextEntry={false}
                />
                <CustomInput
                    title={'Phone Number'}
                    control={control}
                    name={'phoneNumber'}
                    keyboardType={'number-pad'}
                    rules={{
                        required: 'Please enter phone number.',
                        minLength: {
                            value: 1,
                            message: 'Invalid number.'
                        },
                    }}
                />
                <CustomInput
                    title={'E-Mail'}
                    control={control}
                    name={'email'}
                    keyboardType={'email-address'}
                    rules={{
                        required: 'Please enter email.',
                        minLength: {
                            value: 1,
                            message: 'Invalid email.'
                        },
                    }}
                />
                <View style={styles.dropDownCnt} >
                <SelectDropdown
                    data={userStatus}
                    buttonStyle={styles.buttonStyle}
                    buttonTextStyle={styles.buttonTextStyle}
                    rowStyle={{ backgroundColor: Colors.bg_color }}
                    rowTextStyle={{ color: '#272A48', fontSize: 14 }}
                    searchInputStyle={{ backgroundColor: '#2C3E50' }}
                    searchInputTxtColor={'white'}
                    dropdownStyle={{ backgroundColor: '#2C3E50' }}
                    searchPlaceHolder={'...'}
                    onSelect={(selectedItem, index) => {
                        setOnUserStatus(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                    return item
                    }}
                    defaultButtonText={userInfo?.user_status ? userInfo?.user_status :'Status'}
                 />
            
                {onUserStatus?.length > 0 &&  <Text style={styles.status} >Status</Text>}
                <ArrowIcon style={styles.dropIcon} />
                
            </View>

                {
                   isEdit ?
                        <> 
                            <View style={{ marginTop:25,marginBottom:80 }} >
                            <CustomButton type={'TERTIARY'} title={'Edit'} loading={loading} onPress={handleSubmit(handleUpdate)} />
                            <CustomButton type={'PRIMARY'} title={'Delete User'} loading={loadingDelete}  onPress={handleDelete} />
                            </View>
                        </> 
                        :
                        <>
                            <View style={{ marginTop:60,marginBottom:80 }} >
                            <CustomButton type={'TERTIARY'} title={'Add'}  onPress={handleSubmit(handleAdd)} loading={loading}
                             />
                            </View>
                        </>
                }
                <View style={{height:100}} />

            </View>

                <CustomModal
                 onDelete={onDelete}
                 isModalVisible={isModalVisible}
                 setModalVisible={setModalVisible}
                 userInfo={userInfo}
                 navigation={navigation}
                />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    imageContainer: {
        width: 95,
        height: 95,
        backgroundColor: 'white', // Beyaz arka plan ekleyerek çerçeve etkisi elde edilir
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 2, // Çerçeve kalınlığı
        borderColor: 'white', // Çerçeve rengi
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    inputContainer: {
        marginHorizontal: 20,
        marginTop:20
    },
    statusText: {
        fontSize: 13,
        position: 'absolute',
        top: 5,
        left: 15
    },
    dropDownCnt:{
        backgroundColor:'transparent',
        marginTop:10,
        justifyContent:'center'
    },
    buttonTextStyle: {
        color: '#272A48',
        fontSize: 15,
        textAlign: 'left',
        position: 'absolute',
        right:10
      },
      buttonStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        width:'100%',
        height:65,
        borderRadius:20,
       
      },
      status:{
        fontSize:12,
        position:'absolute',
        left:15,
        top:6,
        color:'#282828'
      },
      dropIcon:{
        position:'absolute',
        right:30 
      }
})

export default CreateUserScreen