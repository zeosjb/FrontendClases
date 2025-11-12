import { Ionicons, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, View } from "react-native";

export default function PostListItem({ post }) {
  const [showFullCaption, setShowFullCaption] = useState(false);
  const MAX_LENGTH = 100;

  const caption =
    post.caption?.length > MAX_LENGTH && !showFullCaption
      ? post.caption.slice(0, MAX_LENGTH) + "..."
      : post.caption;

  return (
    <View className="bg-white mb-2 w-max-30">
      {/* Header: Usuario */}
      <View className="flex-row items-center p-2">
        <Image
          source={{ uri: post.user.image_url }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Text className="font-bold text-base">{post.user.username}</Text>
      </View>

      {/* Imagen principal */}
      <Image
        source={{ uri: post.image_url }}
        className="w-full aspect-square"
        resizeMode="cover"
      />

      {/* Botones de acción */}
      <View className="flex-row items-center px-3 pt-2 pb-1">
        <Octicons name="heart" size={26} color="black" />
        <Ionicons
          name="chatbubble-outline"
          size={26}
          color="black"
          className="ml-3"
        />
      </View>

      {/* Caption con "ver más" */}
      <View className="px-3 pb-2">
        <Text>
          <Text className="font-bold">{post.user.username} </Text>
          <Text>{caption} </Text>
          {post.caption?.length > MAX_LENGTH && (
            <Text
              className="text-gray-500"
              onPress={() => setShowFullCaption(!showFullCaption)}
            >
              {showFullCaption ? " Ver menos" : " Ver más"}
            </Text>
          )}
        </Text>
      </View>

      {/* Fecha estilo Instagram */}
      <Text className="text-gray-400 text-xs px-3 pb-3 uppercase">
        Hace 2 horas
      </Text>
    </View>
  );
}
