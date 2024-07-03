import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import CartItem from "./citem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };
    loadCart();
  }, []);

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));

    if (navigation.setParams) {
      navigation.setParams({ cartUpdated: Date.now() });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Open Fashion</Text>
      <Text style={styles.subHeader}>CHECKOUT</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem product={item} onRemoveFromCart={removeFromCart} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default CartScreen;
