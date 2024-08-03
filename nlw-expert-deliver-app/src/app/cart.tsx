import { Header } from "@/components/header";
import { Text, View, ScrollView, Alert, Linking } from "react-native";
import { Product } from "@/components/products";
import { ProductCartProps, userCartStore } from "@/stores/car-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/back-button";
import { useState } from "react";
import { useNavigation } from "expo-router";

export default function Cart() {
  const [adress, setAdress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const carstore = userCartStore();

  const navigation = useNavigation();

  const total = formatCurrency(
    carstore.products.reduce(
      (total, product) => total + product.price * product.qnt,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => carstore.remove(product.id),
      },
    ]);
  }

  function handleOrder() {
    if (adress.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }

    const products = carstore.products
      .map((product) => `\n ${product.qnt} ${product.title}`)
      .join("");

    const message = `
      NOVO PEDIDO
      \n Entregar em: ${adress}

      ${products}
      
      \n Valor total: ${total}
    `;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`
    );

    carstore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header tittle="Carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {carstore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {carstore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                O seu carrinho esta vazio.
              </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereco de entrega com rua, destrito, codigo postal e cidade"
              onChangeText={setAdress}
              blurOnSubmit={true} // faz com que o button de enter funcione como enviar em vez de dar enter
              onSubmitEditing={handleOrder}
            />
            <Input
              className="top-4"
              placeholder="insira o numero de telemovel com o codigo do pais como por exemplo 351 sem o + "
              onChangeText={setPhoneNumber}
            />

          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar a ementa" href="/" />
      </View>
    </View>
  );
}
