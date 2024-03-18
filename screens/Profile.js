import React, {useEffect, useState} from 'react';
import {Text, View, Image, Button, TextInput, Stylesheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dimensions from 'react-native/Libraries/Utilities/Dimensions';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';

const ProfileScreen = (props) => {
    const { isDark } = useDarkMode();
    const { isLargeText } = useLargeText();
    const [image, setImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pronoun, setPronouns] = useState('');

    const styles = {
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 50,
            marginVertical: 10,
            alignSelf: 'center',
        },
        profileInfo: {
            width: Dimensions.get('window').width * 0.4,
            marginVertical: 10,
            alignSelf: 'center',
        },
      container: {
          flex: 1,
          justifyContent: 'top',
          backgroundColor: isDark ? '#191919' : '#fff',
        },
        text: {
          color: isDark ? '#fff' : '#000',
          fontSize: isLargeText ? 24 : 18,
          marginBottom: 5,
          marginHorizontal: 5,
          textAlign:'left'
        },
        heading: {
          color: isDark ? '#fff' : '#000',
          fontSize: isLargeText ? 40 : 24,
          marginBottom: 10,
          marginHorizontal: 10,
          textAlign:'center',
          fontWeight: 'bold',
        },
    };

    useEffect(() => {

        getData();
    }, []);

    useEffect(() => {
        props.setProfileImageUri(image);
    }, [image]);
    const getData = async () => {
        try {
            const name = await AsyncStorage.getItem('name');
            const email = await AsyncStorage.getItem('email');
            const pronoun = await AsyncStorage.getItem('pronoun');
            let imageUri = await AsyncStorage.getItem('imageUri');

            if(!imageUri){
                imageUri = require('../assets/profile.png');
            }

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
                setImage(imageUri);
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
                await AsyncStorage.setItem('imageUri', image);
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
        storeData().then(() => {
            props.setProfileImageUri(image);
        } );

    };
    return (
        <View style={styles.container}>

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
                        color: isDark ? '#fff' : '#000',
                        fontSize: isLargeText ? 24 : 18,
                        marginBottom: 5,
                        marginHorizontal: 5,
                        textAlign:'left',
                    }}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

            ) : (
                <Text style={styles.text}>Name: {name}</Text>
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
                        color: isDark ? '#fff' : '#000',
                        fontSize: isLargeText ? 24 : 18,
                        marginBottom: 5,
                        marginHorizontal: 5,
                        textAlign:'left',
                    }}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

            ) : (
                <Text style={styles.text}>Email: {email}</Text>
            )}
            {isEditing ? (
                <Picker
                    style={styles.text}
                    selectedValue={pronoun}
                    onValueChange={(itemValue) => setPronouns(itemValue)}>

                    <Picker.Item label="He/Him" value="He/Him" />
                    <Picker.Item label="She/Her" value="She/Her" />
                    <Picker.Item label="They/Them" value="They/Them" />
                    <Picker.Item label="Other" value="Other" />



                </Picker>
            ) : (
                <Text style={styles.text}>Pronouns: {pronoun}</Text>
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

export default ProfileScreen;
