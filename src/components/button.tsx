import { StyleSheet, View, Pressable, Text } from 'react-native';
import {SymbolView} from "expo-symbols";
type Props = {
  label: string;
  theme?: 'primary' | 'secondary';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
    if (theme === 'primary') {
        return (
           <View style={styles.buttonContainer}>
              <Pressable style={[styles.button, styles.primary]} onPress={onPress}>
                <SymbolView
                  name={{ ios: 'photo.artframe', android: 'replace_image', web: 'replace_image' }}
                  size={18}
                  tintColor="#25292e"
                />
                <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
              </Pressable>
            </View>
        );
    }
    if(theme === 'secondary') {
        return (
           <View style={styles.buttonContainer}>
              <Pressable style={[styles.button, styles.secondary]} onPress={onPress}>
                <SymbolView
                  name={{ ios: 'checkmark.circle', android: 'task_alt', web: 'task_alt' }}
                  size={18}
                  tintColor="#25292e"
                />
                <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
              </Pressable>
            </View>
        );

    }
    return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: 52,
     
    borderRadius: 12, // Sleek slightly rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    // Shadow for iOS
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, y: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 4,
  },
  primary: {
    backgroundColor: '#888afa',
  },
  secondary: {
    backgroundColor: '#ffffff',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }], // Micro-interaction squeeze effect
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600', // Semi-bold text looks highly professional
    letterSpacing: 0.5,
  },
  
});

