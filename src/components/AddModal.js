import React, {useState} from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Keyboard
} from "react-native";

const AddModal = ({visibility, closeModal, saveDomain}) => {
    const [domainName, setDomainName] = useState('');
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibility}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add new domain</Text>
                    <TextInput
                        placeholder='Domain Name'
                        value={domainName}
                        onChangeText={(text) => {
                            setDomainName(text)
                        }}
                    />
                    <View style={{flexDirection:'row'}}>
                        <TouchableHighlight
                            style={styles.openButton}
                            onPress={closeModal}
                        >
                            <Text style={styles.textStyle}>cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {saveDomain(domainName); setDomainName(''); Keyboard.dismiss()}}
                        >
                            <Text style={styles.textStyle}>save</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    margin : 10,
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width : 80
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default AddModal;