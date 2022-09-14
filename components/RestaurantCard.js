import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {Feather} from "@expo/vector-icons";
import {urlFor} from "../sanity";
import {useNavigation} from "@react-navigation/native";

const RestaurantCard = ({
                          id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
                        }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat
        })
      }}
      className="bg-white mr-3 shadow">
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"/>

      <View className="px-3 pb-4">

        <Text className="font-bold text-lg pt-2">{title}</Text>

        <View className="flex-row items-center space-x-1 pb-1">
          <Feather size={22} name="star" color="#00CCBB"/>
          <Text className="text-gray-500">
            <Text className={"text-delivery"}>{rating}</Text> · {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <Feather size={22} name="map-pin" color="gray"/>
          <Text className="text-gray-500 text-xs">{address}</Text>
        </View>

      </View>

    </TouchableOpacity>)
}

export default RestaurantCard