import { useColorScheme } from 'react-native-appearance'
export const useTheme = () => {
  const theme = useColorScheme()
  const colors = theme ? "#fff" : "#000"
  return colors
}