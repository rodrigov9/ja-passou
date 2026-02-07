import { Text, View } from 'react-native'

export function ServiceListEmpty() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Nenhum serviço encontrado.</Text>
    </View>
  )
}
