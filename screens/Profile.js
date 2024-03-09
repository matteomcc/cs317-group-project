import React, { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
    const [image, setImage] = useState(null);

    const selectImage = async () => {
        // No permissions request is necessary for launching the image library
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
    return (
        <View>
            <Text style={styles.heading}>User Profile</Text>

            {image && <Image source={{ uri: image }} style={styles.profileImage} />}

            <Button title="Choose a profile picture!" onPress={selectImage} />

            <View style={styles.profileInfo}>
                <Text style={styles.detail}>Name: John Doe</Text>
                <Text style={styles.detail}>Email: john.doe@example.com</Text>

            </View>
        </View>
    );
};

const styles = {
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileInfo: {
        marginVertical: 10,
    },
    detail: {
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
