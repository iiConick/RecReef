// In ./screens/AdminScreen1.js
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { db, storage } from "../firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image as RNImage, Alert } from "react-native";
import sandDollarImage from "../assets/sand-dollar.png";

function AdminScreen1() {
  const textInputRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buttons, setButtons] = useState([]);

  const [newButtonData, setNewButtonData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    sandDollarValue: "",
  });

  const handleDelete = async (item) => {
    Alert.alert(
      "Delete Item", // Alert Title
      "Are you sure you want to delete this?", // Alert Message
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await db.collection("buttons").doc(item.id).delete();
              console.log("Document successfully deleted!");
            } catch (error) {
              console.error("Error deleting document: ", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const addNewButton = async () => {
    try {
      await db.collection("buttons").add({
        name: newButtonData.name,
        description: newButtonData.description,
        imageUrl: newButtonData.imageUrl,
        sandDollarValue: newButtonData.sandDollarValue,
      });
      setModalVisible(false); // Close the modal after adding.
      setNewButtonData({
        name: "",
        description: "",
        imageUrl: "",
        sandDollarValue: "",
      }); // Reset form.
    } catch (error) {
      console.error("Error adding new button: ", error);
    }
  };

  const saveSandDollarValue = async () => {
    if (selectedItem && selectedItem.id) {
      try {
        await db.collection("buttons").doc(selectedItem.id).update({
          sandDollarValue: selectedItem.sandDollarValue,
        });
        setModalVisible(false); // Close the modal after saving.
        setSelectedItem(null); // Reset selected item.
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = db.collection("buttons").onSnapshot((snapshot) => {
      const buttonData = [];
      snapshot.forEach((doc) => {
        buttonData.push({ ...doc.data(), id: doc.id });
      });
      setButtons(buttonData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.adminContainer}>
      <View style={styles.buttonContainer}>
        <Image
          source={{ uri: `${item.imageUrl}` }}
          style={styles.buttonImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>{item.name}</Text>
          <Text style={styles.buttonDescription}>{item.description}</Text>
        </View>
        <View style={styles.sandDollarContainer}>
          <Text style={styles.sandDollarValue}>{item.sandDollarValue}</Text>
          <Image source={sandDollarImage} style={styles.sandDollarIcon} />
        </View>
      </View>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setSelectedItem(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.whiteText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.whiteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <KeyboardAvoidingView 
  style={styles.centeredView} 
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
>
            <View style={styles.modalView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Button Name"
                placeholderTextColor="#666"
                value={selectedItem ? selectedItem.name : newButtonData.name}
                onChangeText={(value) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, name: value })
                    : setNewButtonData({ ...newButtonData, name: value })
                }
              />
              <TextInput
                placeholder="Description"
                placeholderTextColor="#666"
                multiline={true} // Allow multiple lines
                numberOfLines={4} // Set a default and max number of visible lines
                style={[styles.textInputStyle, styles.textArea]} // Apply additional styling
                value={
                  selectedItem
                    ? selectedItem.description
                    : newButtonData.description
                }
                onChangeText={(value) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, description: value })
                    : setNewButtonData({ ...newButtonData, description: value })
                }
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Image URL"
                placeholderTextColor="#666"
                value={
                  selectedItem ? selectedItem.imageUrl : newButtonData.imageUrl
                }
                onChangeText={(value) =>
                  selectedItem
                    ? setSelectedItem({ ...selectedItem, imageUrl: value })
                    : setNewButtonData({ ...newButtonData, imageUrl: value })
                }
              />

              <TextInput
                style={styles.textInputStyle}
                placeholder="Sand Dollar Value"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={
                  selectedItem
                    ? selectedItem.sandDollarValue.toString()
                    : newButtonData.sandDollarValue
                }
                onChangeText={(value) =>
                  selectedItem
                    ? setSelectedItem({
                        ...selectedItem,
                        sandDollarValue: value,
                      })
                    : setNewButtonData({
                        ...newButtonData,
                        sandDollarValue: value,
                      })
                }
              />
              <TouchableOpacity
                onPress={selectedItem ? saveSandDollarValue : addNewButton}
                style={styles.modalEditButton}
              >
                <Text style={styles.modalButtonText}>
                  {selectedItem ? "Save" : "Add"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => {
                  setModalVisible(false);
                  if (!selectedItem)
                    setNewButtonData({
                      name: "",
                      description: "",
                      imageUrl: "",
                      sandDollarValue: "",
                    });
                }}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </Modal>
      )}
      <TouchableOpacity
        style={styles.adminContainer}
        onPress={() => {
          setSelectedItem(null);
          setModalVisible(true);
        }}
      >
        <Text style={{ textAlign: "center", marginVertical: 15 }}>
          Add New Button
        </Text>
      </TouchableOpacity>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  adminContainer: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    width: Dimensions.get("window").width - 20,
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDescription: {
    fontSize: 14,
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 10, // Add some spacing between the image and the text
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row", // Make the container display its children in a row
  },
  sandDollarContainer: {
    position: "absolute",
    top: 5,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  sandDollarValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 2,
  },
  sandDollarIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    marginTop: 10, // To add some space on the sides of the buttons.
  },

  editButton: {
    flex: 1,
    backgroundColor: "blue", // This can be any color you prefer.
    paddingVertical: 10, // Adjust as needed.
    paddingHorizontal: 15,
    borderRadius: 5, // To make the button corners rounded.
  },

  whiteText: {
    color: "white",
    textAlign: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "red", // Typically, delete buttons are red.
    paddingVertical: 10, // Adjust as needed.\
    paddingHorizontal: 15,
    borderRadius: 5, // To make the button corners rounded.
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // This is a semi-transparent background
  },

  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },

  modalTextInput: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10, // Creates spacing between input and button
  },

  modalEditButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10, // Creates spacing between buttons
  },

  modalCloseButton: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  modalButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  textInputStyle: {
    backgroundColor: "#d3d3d3", // Darker background for TextInput fields
    width: "100%",
    padding: 10,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },

  textArea: {
    height: 80, // Define a specific height for the text area (description field)
  },
});

export default AdminScreen1;
