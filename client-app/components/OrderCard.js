import React from 'react'
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import axios from 'axios';
import { getIP } from '../util/getIp';

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


  const closePopup = async () => {
    const IP = await getIP();
    const data = await axios.post(`http://${IP}:5000/updaterating`, {
      rating: rating,
      resid: restaurantid
    })
    alert(`${rating} rating submitted for ${resname}`);
    setPopup(!popup);
  }

  const DownloadRecipt = async () => {
    const html = `
    <html>
    <head>
      <style>
        body {
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333;
          display:grid;
          place-items: center;
        }

        .bill-container {
          width: 85%;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          border-radius: 5px;
          position: relative;
        }

        .bill-container h1 {
          font-size: 24px;
          font-weight: bold;
          margin-top: 0;
        }

        .bill-container hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 20px 0;
        }

        .bill-container table {
          width: 100%;
          margin-bottom: 20px;
        }

        .bill-container th {
          text-align: left;
          padding-bottom: 10px;
        }

        .bill-container td {
          padding-bottom: 10px;
        }

        .bill-container .total-row td {
          font-weight: bold;
          margin-top: 20px;
          border-top: 1px solid #ccc;
        }
        .watermark {
          position: absolute;
          bottom: 40%;
          right: 0;
          opacity: 0.2;
          transform: rotate(-45deg);
      }
      .watermark p {
          font-size: 130px;
          font-weight: bold;
          color: #ccc;
          text-shadow: 2px 2px 0 #333;
          margin: 0;
      }
      </style>
    </head>
    <body>
      <div class="bill-container">
        <h1>Order Details</h1>
        <hr>
        <div>
          <span>Order ID:</span>
          <span>${orderid}</span>
        </div>
        <div>
          <span>Restaurant Name:</span>
          <span>${resname}</span>
        </div>
        <hr>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${ordermenu.map((item) => {
      return `
                <tr>
                  <td>${item.itemname}</td>
                  <td>${item.price}₹</td>
                  <td>${item.noOfItem}</td>
                  <td>${item.price * item.noOfItem}₹</td>
                </tr>
              `;
    }).join('')}
            
            <tr class="total-row">
              <td>Total:</td>
              <td></td>
              <td></td>
              <td>${ordertotal}₹</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="watermark">
        <p>BookMyMeal</p>
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

      <View>
        <Text className="font-bold">{resname}</Text>
      </View>

      <View className=" py-1 items-center mb-4">
        {
          orderstatus === "0" ?
            <View className="bg-light w-full">
              <Text className="text-white mx-auto font-extrabold font tracking-wider py-1">Order accept</Text>
            </View>
            :
            orderstatus === "1" ?
              <View className="bg-light w-full">
                <Text className="text-white mx-auto font-extrabold font tracking-wider py-1">Order confirmed</Text>
              </View>
              :
              orderstatus === "2" ?
                <View className="bg-green w-full">
                  <Text className="text-white mx-auto font-extrabold font tracking-wider py-1">Order prepared</Text>
                </View>
                :
                <View className="bg-red-500 w-full">
                  <Text className="text-white mx-auto font-extrabold font tracking-wider py-1">Order deny</Text>
                </View>
        }
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