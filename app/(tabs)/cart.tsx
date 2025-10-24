import { useCart, useTotalItems, useTotalPrice } from "@/hooks/use-cart";
import { Button } from "@react-navigation/elements";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { products, removeProduct, updateQuantity, clearCart } = useCart();
  const totalItems = useTotalItems();
  const totalPrice = useTotalPrice();

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos ao carrinho antes de prosseguir.");
      return;
    }
    Alert.alert(
      "Prosseguir com a compra",
      `Total: R$ ${totalPrice.toFixed(2)}\n${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => console.log("Compra confirmada!") }
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Limpar carrinho",
      "Tem certeza que deseja remover todos os itens?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Limpar", style: "destructive", onPress: () => clearCart() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Carrinho</Text>
        {products.length > 0 && (
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearButton}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <Text style={styles.emptySubtext}>Adicione produtos para continuar</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            {products.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.nome}</Text>
                  <Text style={styles.productPrice}>R$ {product.preco.toFixed(2)}</Text>
                </View>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(product.id, product.quantidade - 1)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantity}>{product.quantidade}</Text>

                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(product.id, product.quantidade + 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.productFooter}>
                  <Text style={styles.subtotal}>
                    Subtotal: R$ {(product.preco * product.quantidade).toFixed(2)}
                  </Text>
                  <TouchableOpacity onPress={() => removeProduct(product.id)}>
                    <Text style={styles.removeButton}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total ({totalItems} {totalItems === 1 ? 'item' : 'itens'}):</Text>
              <Text style={styles.totalPrice}>R$ {totalPrice.toFixed(2)}</Text>
            </View>
            <Button color="#28a745" onPress={handleCheckout}>
              Prosseguir com a compra
            </Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  clearButton: {
    color: "#dc3545",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  productCard: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productInfo: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: "#007bff",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 10,
  },
  subtotal: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    color: "#dc3545",
    fontSize: 16,
  },
  footer: {
    backgroundColor: "white",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28a745",
  },
});