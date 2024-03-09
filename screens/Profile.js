import React, { useState } from 'react';
import {Text, View, Image, Button, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
    const [image, setImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('email@email.com');

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

            <Button title="Choose a profile picture!" onPress={selectImage} />

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
