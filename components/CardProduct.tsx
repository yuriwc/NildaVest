import { useCart } from "@/hooks/use-cart";
import { Button } from "@react-navigation/elements";
import { Image, Text, View, StyleSheet } from "react-native";

interface CardProductProps {
  id: string;
  title: string;
  price: number;
  imageSource?: any;
}

export default function CardProduct({ id, title, price, imageSource }: CardProductProps) {
  const { products, addProduct, removeProduct } = useCart();

  const isInCart = products.some((product) => product.id === id);

  const handlePress = () => {
    if (isInCart) {
      removeProduct(id);
    } else {
      addProduct({
        id,
        nome: title,
        preco: price,
      });
    }
  };

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.divider} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <Button color={isInCart ? "#dc3545" : "#28a745"} onPress={handlePress}>
            {isInCart ? "Remover do Carrinho" : "Comprar"}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  divider: {
    height: 15,
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  price: {
    color: "#666",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 5,
  },
});