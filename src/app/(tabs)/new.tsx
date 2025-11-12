import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const fileUri = "../../../assets/posts.json";

  useEffect(() => {
    if (!image) pickImage();
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleShare = async () => {
    if (!caption || !image) {
      Alert.alert("Error", "Please select an image and write a caption.");
      return;
    }

    try {
      // Leer posts existentes
      let existingPosts = [];
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(fileUri);
        existingPosts = JSON.parse(content);
      }

      // Crear nuevo post
      const newPost = {
        id: Date.now().toString(),
        image_url: image,
        caption: caption,
        user: {
          id: "u1",
          image_url: "https://randomuser.me/api/portraits/men/32.jpg",
          username: "zeosjb",
        },
      };

      // Guardar al archivo
      const updatedPosts = [newPost, ...existingPosts];
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedPosts));

      Alert.alert("Post shared!", "Your post has been saved successfully 🎉");

      // Reset campos
      setCaption("");
      setImage(null);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not save post.");
    }
  };

  return (
    <View className="p-3 items-center">
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-1/2 aspect-square mx-auto rounded-md shadow-lg"
        />
      ) : (
        <View className="w- aspect-square mx-auto rounded-md shadow-lg bg-gray-200" />
      )}

      <Text className="text-blue-700 txt-sm m-5" onPress={pickImage}>
        Change
      </Text>

      <TextInput
        placeholder="Write a caption..."
        className="border border-gray-300 rounded-md p-2 w-[90vw] h-[10vh]"
        multiline
        value={caption}
        onChangeText={setCaption}
      />

      <Pressable
        className="bg-blue-500 w-full p-3 items-center rounded-md m-5"
        onPress={handleShare}
      >
        <Text className="text-white font-bold">Share</Text>
      </Pressable>
    </View>
  );
}
