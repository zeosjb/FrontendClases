import { FlatList } from 'react-native';
import PostListItem from 'src/components/PostListItem';
import posts from "../../../assets/posts.json";

export default function Home() {
    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <PostListItem post={item} />}
            keyExtractor={(item) => item.id}
        />
    );
}