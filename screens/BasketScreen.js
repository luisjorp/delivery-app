import {SafeAreaView, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurant} from "../features/restaurantSlice";
import {selectBasketItems} from "../features/basketSlice";

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results
        }, {})

        setGroupedItemsInBasket(groupedItems)
    }, [items]);

    return (
        <SafeAreaView>
            <View>
                <View>
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>

                    </View>
                </View>
            </View>
            <Text>BasketScreen</Text>
        </SafeAreaView>
    )
}

export default BasketScreen