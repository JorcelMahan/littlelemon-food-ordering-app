import { useFonts } from 'expo-font';

export default function useCustomFonts() {
    const [loaded] = useFonts({
        'Karla': require('../assets/fonts/Karla-Regular.ttf'),
        'Markazi': require('../assets/fonts/MarkaziText-Regular.ttf'),
    });

    return loaded;
}