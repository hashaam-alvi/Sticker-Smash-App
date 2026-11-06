import { useState, useEffect, useRef, type ComponentRef } from 'react';
import { Platform, View, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import type { ImageSource } from 'expo-image';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';

import Button from '@/components/button';
import ImageViewer from '@/components/imageViewer';
import EmojiPicker from '@/components/emoji-picker';
import IconButton from '@/components/icon-button';
import CircleButton from '@/components/circle-button';
import EmojiList from '@/components/emoji-list';
import EmojiSticker from '@/components/emoji-sticker';


const PlaceholderImage = require('@/assets/images/background-image.png');

type StickerItem = {
  id: string;
  source: ImageSource;
};

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmojis, setPickedEmojis] = useState<StickerItem[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({writeOnly: true});
  const imageRef = useRef<ComponentRef<typeof View>>(null);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setSelectedImage(undefined);
    setPickedEmojis([]);
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSelectEmoji = (emoji: ImageSource) => {
    const newSticker: StickerItem = {
      id: Math.random().toString(36).substring(7),
      source: emoji,
    }
    setPickedEmojis((prev) => [...prev, newSticker]);
  };

  const handleButtonPress = () => {
  if (Platform.OS === 'web') {
    const userConfirmed = window.confirm("Are you sure you want to proceed?");
    if (userConfirmed) {
      onSaveImageAsync();
    }
  } else {
    Alert.alert(
      "Confirmation Required", // Title
      "Are you sure you want to proceed?", // Description
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel" // Gives it a dimmed/cancel treatment on iOS
        },
        { 
          text: "Yes, Do It", 
          onPress: () => onSaveImageAsync() 
        }
      ],
      { cancelable: true } // Allows tapping outside the box to close it on Android
    );
  }
};


  const onSaveImageAsync = async () => {

    if (Platform.OS !== 'web') {
      try{
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
  
        await MediaLibrary.Asset.create(localUri);
        if (localUri) {
          alert('Saved successfully!');
        }
      } catch (e) {
        console.log(e);
        alert('Failed to save image. Please try again.');
      }
    } else {
      try {
        const dataUrl = await captureRef(imageRef, {
          format: 'jpg',
          quality: 1,
          result: 'data-uri',
        });
        // alert('Image saved successfully!');
        const link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log("Error saving image in web:", e);
        alert('Failed to save image. Please try again.');
      }
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <TextInput placeholder="Enter text..." style={styles.textInput} />
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmojis.map((sticker) => (
            <EmojiSticker 
              key={sticker.id}
              imageSize={100} 
              stickerSource={sticker.source} 
            />
          ))}

        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.footerContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon={{
                android: require('@expo/material-symbols/refresh.xml'),
                ios: 'arrow.counterclockwise',
                web: 'refresh',
              }}
              label="Reset"
              onPress={onReset}
            />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon={{
                android: require('@expo/material-symbols/download.xml'),
                ios: 'square.and.arrow.down',
                web: 'download',
              }}
              label="Save"
              onPress={handleButtonPress}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button theme="secondary" label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={handleSelectEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: Platform.select({ web: 96, default: 20 }),
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    color: '#050202',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  }
});
