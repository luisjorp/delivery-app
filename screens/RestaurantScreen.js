import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, {useLayoutEffect} from 'react'
import {useNavigation, useRoute} from "@react-navigation/native";
import {urlFor} from "../sanity";
import {Feather} from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import {useSelector} from "react-redux";
import {selectBasketItems} from "../features/basketSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation()
  const {
    params: {
      id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
    }
  } = useRoute()

  const items = useSelector(selectBasketItems)


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <>
      {items.length > 0 && <BasketIcon/>}
      <ScrollView>
        <View className="relative">
          <Image
            source={{uri: urlFor(imgUrl).url()}}
            className="w-full h-56 bg-gray-300 p-4"/>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
            <Feather name="arrow-left" size={20} color="#00CCBB"/>
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Feather size={22} name="star" color="#00CCBB"/>
                <Text className={"text-gray-500"}>{rating} · {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Feather size={22} name="map-pin" color="#00CCBB"/>
                <Text className={"text-gray-500"}>{address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <Feather size={22} name="help-circle" color="gray"/>
            <Text className="pl-2 flex-1 text-md font-bold"> Have a food allergy?</Text>
            <Feather size={22} name="chevron-right" color="#00CCBB"/>
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/*Dishes*/}
          {dishes.map((dish, index) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />))}
        </View>
      </ScrollView>
    </>

  )
}

export default RestaurantScreen