 import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, PencilIcon, CameraIcon } from 'react-native-heroicons/outline';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";

const Profile = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        // Fetch user's display name upon component mount
        const fetchUserData = async () => {
            const user = auth().currentUser;
            if (user) {
                setUserName(user.displayName || '');
                setUserEmail(user.email || '');

                // Fetch profile picture from Firestore
                const userData = await firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get();
                const userDataObj = userData.data();
                if (userDataObj && userDataObj.profilePicture) {
                    setProfilePic(userDataObj.profilePicture);
                }
            }
        };

        fetchUserData();
    }, []);

    const goBack = () => {
        navigation.goBack();
    };

    const goToEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, async (response) => {
            if (response && response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0]; // Assuming the user selected only one image
    
                const user = auth().currentUser;
                if (user) {
                    const uid = user.uid;
                    const imageUri = selectedImage.uri;
    
                    // Upload image to Firebase Storage
                    const imageName = `profile_picture_${uid}`;
                    const storageRef = storage().ref(`profile_pictures/${imageName}`);
                    try {
                        await storageRef.putFile(imageUri);
                        console.log('Image uploaded to Firebase Storage');
    
                        // Get the download URL of the uploaded image
                        const imageUrl = await storageRef.getDownloadURL();
    
                        // Update the profile picture URI in Firestore
                        await firestore()
                            .collection('users')
                            .doc(uid)
                            .update({
                                profilePicture: imageUrl,
                            });
                        console.log('Profile picture URL updated in Firestore');
                        setProfilePic(imageUrl); // Update the state with the new image URL
                    } catch (error) {
                        console.error('Error uploading image to Firebase Storage:', error);
                    }
                }
            } else {
                // Handle case where response does not contain assets array or is empty
                console.error('Invalid image response:', response);
            }
        });
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

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 8 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 24, fontFamily: 'OCR A Extended Regular' }}>
                        Profile
                    </Text>
                </View>
                <TouchableOpacity onPress={goToEditProfile}>
                    <PencilIcon size={30} strokeWidth={2} color="black" />
                </TouchableOpacity>
            </View>


            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Image source={{ uri: profilePic }} style={{ width: 120, height: 120, borderRadius: 60 }} />
                <Text style={{ color: 'black', fontSize: 20, marginTop: 10 }}>
                    {userName} {/* Display user's name */}
                </Text>
                <Text style={{ color: 'gray', fontSize: 16, marginTop: 5 }}>
                    {userEmail} {/* Display user's email */}
                </Text>
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 20 }}>
                <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>
                    About me
                </Text>
                <Text style={{ color: 'gray', fontSize: 16, lineHeight: 24 }}>
                    I am a passionate gamer and a React Native developer. I love to explore new games and share my reviews on GameSPY. My favorite genres are RPG, FPS, and strategy.
                </Text>
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 20 }}>
                <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>
                    My games
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={{ uri: 'https://i.imgur.com/4y8m5nO.jpg' }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                    <Image source={{ uri: 'https://i.imgur.com/8l1FbXK.jpg' }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                    <Image source={{ uri: 'https://i.imgur.com/2C9qjgH.jpg' }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                </View>
            </View>
            <TouchableOpacity onPress={handleChoosePhoto} style={{ position: 'absolute', right: 16, bottom: 16, backgroundColor: '#000', padding: 10, borderRadius: 10 }}>
                <CameraIcon size={30} strokeWidth={2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={{ position: 'absolute', left: 16, top: 12 }}>
                <Text style={{ color: 'black', fontSize: 16}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;