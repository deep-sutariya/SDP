import React from 'react'
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import axios from 'axios';
import {IP} from '@env';

const OrderCard = (props) => {
  const ordermenu = props.orderData.ordermenu;
  const orderid = props.orderData.orderid;
  const ordermonth = props.orderData.ordermonth;
  const restaurantid = props.orderData.restaurantid;
  const ordertime = props.orderData.ordertime;
  const ordertotal = props.orderData.ordertotal;
  const orderstatus = props.orderData.orderstatus;
  const resname = props.orderData.resname;

  const [rating, setRating] = useState(3);
  const [popup, setPopup] = useState(false);


  const closePopup = async() => {
    console.log(rating + " " + restaurantid);
    const data = await axios.post(`http://${IP}/updaterating`, {
      rating: rating,
      resid: restaurantid
    })
    alert(`${rating} rating submitted for ${resname}`);
    setPopup(false);
  }


  const DownloadRecipt = async () => {
    const html = `
      <html>
        <body>
          <div>
            ${orderid}
            ${ordertime}
          </div>
        </body>
      </html>
    `
    const file = await printToFileAsync({
      html: html,
      base64: false
    })

    const pdfName = `${file.uri.slice(
      0,
      file.uri.lastIndexOf('/') + 1
    )}invoice-${orderid}.pdf`

    await FileSystem.moveAsync({
      from: file.uri,
      to: pdfName,
    })
    await shareAsync(pdfName)
  }

  return (
    <View className='rounded-lg shadow-md p-4 mb-4 mx-2 bg-offwhite'>
      <View className="flex justify-between flex-row mb-3">
        <Text className='font-bold'>OrderId: {orderid}</Text>
        <Text className='font-bold'>{ordertime}</Text>
      </View>

      <View className="bg-red-200 py-1 items-center mb-4">
        <Text className="text-white font-extrabold font tracking-wider">Order Confirm</Text>
      </View>

      <View className='flex-row justify-between mb-2'>
        <Text className='font-bold w-2/4'>Item</Text>
        <Text className='font-bold w-1/4'>No of Item</Text>
        <Text className='font-bold w-1/4'>Price</Text>
      </View>

      {ordermenu.map((item, index) => (
        <View key={index} className='flex-row justify-between mb-2'>
          <Text className='w-2/4'>{item.itemname}</Text>
          <Text className='w-1/4'>{item.noOfItem}</Text>
          <Text className='w-1/4'>{item.price} ₹</Text>
        </View>
      ))}

      <View className='flex-row justify-between mb-2 border-t-2 pt-2'>
        <Text className='font-bold w-2/4'>Total Amount</Text>
        <Text className='w-1/4'></Text>
        <Text className='font-bold w-1/4'>{ordertotal} ₹</Text>
      </View>

      <View className='flex-row justify-between mt-4'>
        <TouchableOpacity className="bg-green rounded-md px-3 py-2" onPress={DownloadRecipt}><Text className="text-white font-semibold">Download Receipt</Text></TouchableOpacity>
        <TouchableOpacity className="bg-light rounded-md px-3 py-2" onPress={() => setPopup(!popup)}><Text className="text-white font-semibold">Ratings</Text></TouchableOpacity>
      </View>

      {
        popup ?
          <View className='flex-1 justify-center items-center'>
            <Text className='text-lg font-bold my-4'>Thank You for Ordering !</Text>
            <Text className='text-base mb-6'>{resname}</Text>
            <View className='flex flex-row mb-6'>
              <TouchableOpacity onPress={() => setRating(1)}>
                <Text className={rating >= 1 ? 'text-2xl text-yellow-400' : 'text-2xl text-gray-400'}>★</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRating(2)}>
                <Text className={rating >= 2 ? 'text-2xl text-yellow-400' : 'text-2xl text-gray-400'}>★</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRating(3)}>
                <Text className={rating >= 3 ? 'text-2xl text-yellow-400' : 'text-2xl text-gray-400'}>★</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRating(4)}>
                <Text className={rating >= 4 ? 'text-2xl text-yellow-400' : 'text-2xl text-gray-400'}>★</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRating(5)}>
                <Text className={rating >= 5 ? 'text-2xl text-yellow-400' : 'text-2xl text-gray-400'}>★</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={closePopup} className='bg-light py-1 px-6 rounded-md'>
              <Text className='text-white font-bold text-lg'>Submit</Text>
            </TouchableOpacity>
          </View>

          :

          <></>
      }

    </View>
  )
}

export default OrderCard