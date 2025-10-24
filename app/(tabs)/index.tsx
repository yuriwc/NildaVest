import CardProduct from "@/components/CardProduct";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const products = [
  {
    id: '1',
    title: 'Calça Jeans Feminina',
    price: 120.00,
    image: require('../../assets/images/calca.jpg'),
  },
  {
    id: '2',
    title: 'Calça Jeans Masculina',
    price: 150.00,
    image: require('../../assets/images/calca.jpg'),
  },
  {
    id: '3',
    title: 'Calça Jean Infantil',
    price: 100.00,
    image: require('../../assets/images/calca.jpg'),
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Produtos</Text>
      <ScrollView>
        {products.map(product => (
          <CardProduct
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            imageSource={product.image}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}