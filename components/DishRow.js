import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter'
import {urlFor} from "../sanity";
import {Feather} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId
} from "../features/basketSlice";

const DishRow = ({
                   id,
                   name,
                   description,
                   price,
                   image,
                 }) => {
  const [isPressed, setIsPressed] = React.useState(false)
  const dispatch = useDispatch()
  const items = useSelector(state => selectBasketItemsWithId(state, id))

  const addItemsToBasket = () => {
    dispatch(addToBasket({
      id,
      name,
      description,
      price,
      image,
    }))
  }

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({
      id,
      name,
      description,
      price,
      image,
    }))
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2"><Currency quantity={price} currency="USD"/></Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#F3F3F4',
              }}
              className="h-20 w-20 bg-gray-300 p-4"
              source={{
                uri: urlFor(image).url(),
              }}/>
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemsFromBasket} disabled={!items.length}>
              <Feather size={40} name="minus-circle" color={items.length > 0 ? "#00CCBB" : "gray"}/>
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemsToBasket}>
              <Feather size={40} name="plus-circle" color="#00CCBB"/>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow