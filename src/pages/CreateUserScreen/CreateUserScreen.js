import { View, Text, StyleSheet, ScrollView, Image,Button,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import CutsomHeader from '../../components/CutsomHeader'
import { useForm } from "react-hook-form";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../styles/Colors';

const CreateUserScreen = ({ navigation }) => {
    const { handleSubmit, control, formState: { errors }, watch } = useForm();
    const cities = [
        { name: 'Active', id: 1 },
        { name: 'Deactive', id: 2 },
      ];
    
      const [selectedCity, setSelectedCity] = useState('');
    
      const handleCityChange = itemValue => {
        setSelectedCity(itemValue);
      };

    return (
        <ScrollView>
            <CutsomHeader title={'Create User'} onPress={() => navigation.goBack()} />

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
                    rules={{
                        required: 'Please enter phone email.',
                        minLength: {
                            value: 1,
                            message: 'Invalid email.'
                        },
                    }}
                />
                 <View style={styles.status} >
                    <Text style={styles.statusText} >Status</Text>
                <Picker
                    enabled={true}
                    mode="dropdown"
                    placeholder="Select City"
                    onValueChange={handleCityChange}
                    selectedValue={selectedCity}
                    dropdownIconColor={Colors.red}
                    
                >   
                    {cities.map(item => (
                        <Picker.Item
                            label={item.name.toString()}
                            value={item.name.toString()}
                            key={item.id.toString()}
                        />
                    ))}
                </Picker>

                {/* <TouchableOpacity  title="Print City" onPress={handlePrintCity}>
                   <Text>{selectedCity}</Text>
                </TouchableOpacity> */}
            </View>

                <View style={{ height: 120 }} />
                <CustomButton type={'TERTIARY'} title={'Add'} />
                <View style={{ height: 120 }} />

            </View>
           

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
        marginHorizontal: 10
    },
    status:{
        backgroundColor:Colors.white,
        height:72,
        borderRadius:20,
        justifyContent:'center',
        marginTop:10
    },
    statusText:{
        fontSize:13,
        position:'absolute',
        top:5,
        left:15
    }
})

export default CreateUserScreen