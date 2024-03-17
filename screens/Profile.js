import React, {useEffect, useState} from 'react';
import {Text, View, Image, Button, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const [image, setImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pronoun, setPronouns] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const name = await AsyncStorage.getItem('name');
            const email = await AsyncStorage.getItem('email');
            const pronoun = await AsyncStorage.getItem('pronoun');
            const imageUri = await AsyncStorage.getItem('imageUri'); // Retrieve image URI
            if (name !== null) {
                setName(name);
            }
            if (email !== null) {
                setEmail(email);
            }
            if (pronoun !== null) {
                setPronouns(pronoun);
            }
            if (imageUri !== null) {
                setImage(imageUri); // Set the image URI to state
            }
        } catch (e) {
            console.log(e);
        }
    }

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('pronoun', pronoun);
            if (image) {
                await AsyncStorage.setItem('imageUri', image); // Save image URI
            }
        } catch (e) {
            console.log(e);
        }
    }


    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });



        console.log(result);


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        storeData().then( );

    };
    return (
        <View>
            <Text style={styles.heading}>Manage your profile</Text>

            {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
                <Image
                    source={require('../assets/icon.png')}
                    style={styles.profileImage}
                />
            )}

            {isEditing ? (
                    <Button title="Choose a profile picture!" onPress={selectImage} />
            ) : null}

            {isEditing ? (
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        padding: 10,
                        marginHorizontal: 10,
                    }}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

            ) : (
                <Text style={styles.detail}>Name: {name}</Text>
            )}
            {isEditing ? (
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        padding: 10,
                        marginHorizontal: 10,
                        marginVertical: 10,
                    }}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

            ) : (
                <Text style={styles.detail}>Email: {email}</Text>
            )}
            {isEditing ? (
                <Picker
                    selectedValue={pronoun}
                    onValueChange={(itemValue) => setPronouns(itemValue)}>

                    <Picker.Item label="He/Him" value="He/Him" />
                    <Picker.Item label="She/Her" value="She/Her" />
                    <Picker.Item label="They/Them" value="They/Them" />
                    <Picker.Item label="Other" value="Other" />



                </Picker>
            ) : (
                <Text style={styles.detail}>Pronouns: {pronoun}</Text>
            )}


            <View style={styles.profileInfo}>
                {isEditing ? (
                    <Button title="Save" onPress={handleSave} />
                ) : (
                    <Button title="Edit" onPress={handleEdit} />
                )}
            </View>
        </View>
    );
};

const styles = {
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 10,

    },
    profileInfo: {
        marginVertical: 10,
    },
    detail: {
        marginHorizontal : 10,
        fontSize: 18,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
        alignSelf: 'center',
    },
};

export default ProfileScreen;
