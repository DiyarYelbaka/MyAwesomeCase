import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import Line from '../../assets/svg/top_line_icon.svg'
import CompleteIcon from '../../assets/svg/complated_icon.svg'
import DeleteIcon from '../../assets/svg/deleted_icon.svg'
import CustomButton from '../CustomButton';
import { showMessage } from "react-native-flash-message";
import { deleteUser } from '../../services/api';

const CustomModal = ({ isModalVisible, setModalVisible, onDelete,userInfo,navigation }) => {

  const [loading, setLoading] = useState(false)

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  async function handleDeleteUser() {
    try {
      setLoading(true)
      const getResponse = await deleteUser(userInfo?.user_id);
      setModalVisible(false)
      navigation.navigate('usersScreen', { onRefresh: Math.floor(Math.random() * 100) + 1 })
      setLoading(false)
      showMessage({
        message: "Congratulations",
        description: "You have successfully created a user",
        type: "success",
      });
    } catch (error) {
      showMessage({
        message: "Ops",
        description: "Please try again",
        type: "danger",
      });
      setLoading(false)
      console.error('Error:', error);
      //console.error('Error:', error.response.data.errorCode);
    }
  }

  function handleUpdate(){
   setModalVisible(false)
   navigation.navigate('usersScreen', { onRefresh: Math.floor(Math.random() * 100) + 1 })
  }

  return (

    <Modal
      isVisible={isModalVisible}
      swipeDirection={['down']} // Pencereyi aşağı kaydırarak kapatma
      onSwipeComplete={toggleModal}
      style={styles.modal}

    >
      <>

        <View style={styles.container}>

          <Line style={styles.line} />
          {
            !onDelete ?
              <>
                <CompleteIcon height={'120'} width={'120'} style={styles.complete} />
                <Text style={styles.title} >Updated!</Text>
                <Text style={styles.desc} >Updated Successfully.</Text>
                <View style={{ height: 52,marginHorizontal:10 }} >
                  <CustomButton title={"Okey"} type={'PRIMARY'} onPress={handleUpdate}  />
                </View>
              </>
              :
              <>
                <DeleteIcon height={'120'} width={'120'} style={styles.complete} />
                <Text style={styles.title} >Delete!</Text>
                <Text style={styles.desc} >Are you sure you want to delete?.</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10 }} >
                  <CustomButton title={"Okey"} type={'PRIMARY'} loading={loading} onPress={handleDeleteUser} />
                  <View style={{ width: '5%' }} />
                  <CustomButton
                    title={"Cancel"}
                    type={'QUANTERNARY'}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </>
          }

        </View>
      </>
    </Modal>

  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,

  },

  container: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  line: {
    alignSelf: 'center'
  },
  complete: {
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    color: '#272A48'
  },
  desc: {
    color: '#7F879E',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 25
  }
});


export default CustomModal