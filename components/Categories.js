import {View, Text, ScrollView} from 'react-native'
import React, {useEffect} from 'react'
import CategoryCard from "./CategoryCard";
import sanityClient from "../sanity";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    return () => {
      sanityClient.fetch(`*[_type == "category"]`).then((data) => {
        setCategories(data);
      });
    };
  });

  return (<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={
    {
      paddingHorizontal: 15,
      paddingTop: 10,
    }
  }>
    {/*CategoryCard*/}
    {categories?.map((category) => (
      <CategoryCard key={category._id} id={category._id} title={category.name} imgUrl={category.image}/>
    ))}
  </ScrollView>)
}

export default Categories