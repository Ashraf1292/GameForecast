import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { HandThumbUpIcon, HandThumbDownIcon } from 'react-native-heroicons/solid';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    useEffect(() => {
        // Fetch user name upon component mount
        const fetchUserName = async () => {
            const user = auth().currentUser;
            if (user) {
                setUserName(user.displayName || '');
            }
        };

        fetchUserName();
    }, []);

    useEffect(() => {
        // Subscribe to posts collection
        const unsubscribe = firestore().collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            const fetchedPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(fetchedPosts);
        });

        // Unsubscribe from snapshot listener when component unmounts
        return () => unsubscribe();
    }, []);

    const openDrawer = () => {
        navigation.openDrawer();
    };

    const goToSearchPage = () => {
        navigation.navigate('Search');
    };

    const handleSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }]
                });
            })
            .catch(error => console.error('Error signing out:', error));
    };

    const handlePost = async () => {
        if (!newPostContent.trim()) {
            Alert.alert('Error', 'Please enter something to post.');
            return;
        }

        try {
            await firestore().collection('posts').add({
                content: newPostContent,
                userName: userName,
                timestamp: firestore.FieldValue.serverTimestamp()
            });
            setNewPostContent('');
        } catch (error) {
            console.error('Error posting:', error);
            Alert.alert('Error', 'An error occurred while posting. Please try again later.');
        }
    };

    const renderPostItem = ({ item }) => {
        const handleLike = async () => {
            try {
                await firestore().collection('posts').doc(item.id).update({
                    likes: firestore.FieldValue.increment(1) // Increment the likes count by 1
                });
            } catch (error) {
                console.error('Error liking post:', error);
                Alert.alert('Error', 'An error occurred while liking the post. Please try again later.');
            }
        };

        const handleDislike = async () => {
            try {
                await firestore().collection('posts').doc(item.id).update({
                    dislikes: firestore.FieldValue.increment(1) // Increment the dislikes count by 1
                });
            } catch (error) {
                console.error('Error disliking post:', error);
                Alert.alert('Error', 'An error occurred while disliking the post. Please try again later.');
            }
        };

        return (
            <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                    <Text style={styles.postHeaderTitle}>{item.userName}</Text>
                    <Text style={styles.postHeaderDate}>{new Date(item.timestamp.toDate()).toDateString()}</Text>
                </View>
                <View style={styles.postContent}>
                    <Text style={styles.postText}>{item.content}</Text>
                    {/* Add any additional elements, such as images, here */}
                </View>
                <View style={styles.postActions}>
                    <TouchableOpacity style={styles.postAction} onPress={handleLike}>
                        <HandThumbUpIcon size={20} color="black" />
                        <Text style={styles.actionText}>{item.likes || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postAction} onPress={handleDislike}>
                        <HandThumbDownIcon size={20} color="black" />
                        <Text style={styles.actionText}>{item.dislikes || 0}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 8 }}>
                <TouchableOpacity onPress={openDrawer}>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="black" />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 24, fontFamily: 'OCR A Extended Regular' }}>GameSPY</Text>
                <TouchableOpacity onPress={goToSearchPage}>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginHorizontal: 16 }}>
                <TextInput
                    placeholder="Write something..."
                    value={newPostContent}
                    onChangeText={setNewPostContent}
                    style={{ flex: 1, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10, marginRight: 10 }}
                />
                <TouchableOpacity onPress={handlePost} style={{ backgroundColor: '#000', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>Post</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={posts}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 10,
        padding: 10,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    postHeaderTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    postHeaderDate: {
        color: '#888888',
    },
    postContent: {
        marginBottom: 10,
    },
    postText: {
        fontSize: 16,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 5,
    },
});

export default Home;
