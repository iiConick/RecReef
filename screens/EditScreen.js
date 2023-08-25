function EditScreen({ route, navigation }) {
    const { itemData } = route.params;
    
    const [name, setName] = useState(itemData.name);
    const [description, setDescription] = useState(itemData.description);
    const [imageUrl, setImageUrl] = useState(itemData.imageUrl);
  
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput 
          value={name} 
          onChangeText={setName} 
          placeholder="Name"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} 
        />
        <TextInput 
          value={description} 
          onChangeText={setDescription} 
          placeholder="Description"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} 
        />
        <TextInput 
          value={imageUrl} 
          onChangeText={setImageUrl} 
          placeholder="Image URL"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} 
        />
        <Button title="Save" onPress={() => {
          // TODO: Save the edited data, perhaps update backend or state
          navigation.goBack();
        }} />
      </View>
    );
  }
  