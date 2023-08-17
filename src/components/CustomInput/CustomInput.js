import { View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Controller } from "react-hook-form";
import Visible from '../../assets/svg/eye_open_icon.svg'
import { TextInput } from 'react-native-paper';
import OffVisible from '../../assets/svg/eye_closed_icon.svg'
import Colors from '../../styles/Colors';


const CustomInput = ({ title, placeholder, visiblePassword = false, name, control, rules = {}, secureTextEntry,keyboardType,maxLength,onDescription }) => {

    const [visible, setVisible] = useState(false)

    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label={title}
                                value={value}
                                onChangeText={onChange}
                                placeholder={placeholder}
                                onBlur={onBlur}
                                secureTextEntry={ visible ? false :  secureTextEntry}
                                keyboardType={keyboardType}
                                maxLength={maxLength}
                                multiline={onDescription}
                                underlineColor='transparent'
                                underlineStyle={{ backgroundColor: 'transparent' }}
                                backgroundColor={Colors.white}
                                contentStyle={{ borderRadius: 20, height: 61 }}
                                style={{ backgroundColor: 'transparent' }}
                                textColor={'#272A48'}
                                activeUnderlineColor={'#282828'}
                                autoCapitalize='none'
                                

                            />
                            {visiblePassword &&
                            <TouchableOpacity style={styles.eyes} onPress={() => setVisible(!visible)}  >
                              {  visible ?
                                    <Visible width="30" height="30" fill={'#fff'} />
                                    :
                                    <OffVisible width="30" height="30" fill={'#fff'} /> 
                                }
                            </TouchableOpacity>
                            }
                        </View>
                        {error && <Text style={styles.error}>{error.message || 'Error'}</Text>}
                    </View>
                )}

            />


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 72,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    inputContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    input: {
        minHeight: 52,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderColor: 'white',
        color: 'white',
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    },
    eyes: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        height: '100%',
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        color: Colors.red,
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft:10
    }
})

export default CustomInput