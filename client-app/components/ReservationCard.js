import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system'

const ReservationCard = ({ noofpeople, resaddress, reservationtime, resid, resname, resphone, respincode }) => {

    const DownloadReceipt = async () => {
        const html = `
        <html>
        <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                font-size: 26px;
                color: #333;
                background-repeat: no-repeat;
                background-attachment: fixed;
                margin: auto 0px;
            }
            .card {
                padding: 40px 60px;
                border-radius: 16px;
                background-color: #fff;
                max-width: 700px;
                margin: 20px auto;
                position: relative;
            }
            .card::before {
                content: " ";
                position: absolute;
                top: 0;
                left: 0;
                width: 200px;
                height: 200px;
                background-repeat: no-repeat;
                background-size: contain;
                opacity: 0.1;
            }
            h2 {
                font-size: 46px;
                margin-bottom: 40px;
                text-align: center;
                text-shadow: 2px 2px #666;
                color: #DF7861;
            }
            p {
                margin-bottom: 20px;
                text-shadow: 1px 1px #ccc;
            }
            .label {
                font-weight: bold;
            }
            .value {
                margin-left: 10px;
            }
            .watermark {
                position: absolute;
                bottom: 5%;
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
            <div class="card">
            <h2>Reservation Details</h2>
            <p><span class="label">ID:</span><span class="value">${resid}</span></p>
            <p><span class="label">Name:</span><span class="value">${resname}</span></p>
            <p><span class="label">Phone:</span><span class="value">${resphone}</span></p>
            <p><span class="label">No. of People:</span><span class="value">${noofpeople}</span></p>
            <p><span class="label">Restaurant Address:</span><span class="value">${resaddress}</span></p>
            <p><span class="label">Pincode:</span><span class="value">${respincode}</span></p>
            <p><span class="label">Booking Time:</span><span class="value">${reservationtime}</span></p>
            <div class="watermark">
                <p>BookMyMeal</p>
            </div>
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
        )}invoice.pdf`

        await FileSystem.moveAsync({
            from: file.uri,
            to: pdfName,
        })
        await shareAsync(pdfName)
    }

    return (
        <View className="flex flex-col justify-center items-center gap-x-4 gap-y-2 my-3 bg-gray-50 rounded-md p-4 shadow-md border border-1 w-5/6 mx-auto">

            <View className="flex flex-row justify-between gap-x-4">
                <Text className="w-4/12 font-semibold">Name:</Text>
                <Text className="font-medium text-dark w-7/12">{resname}</Text>
            </View>

            <View className="flex flex-row justify-between gap-x-4">
                <Text className="w-4/12 font-semibold">Phone:</Text>
                <Text className="text-gray-600 w-7/12">{resphone}</Text>
            </View>

            <View className="flex flex-row justify-between gap-x-4">
                <Text className="w-4/12 font-semibold">No. of People:</Text>
                <Text className="text-gray-600 w-7/12">{noofpeople}</Text>
            </View>

            <View className="flex flex-row justify-between gap-x-4">
                <Text className="w-4/12 font-semibold">Address:</Text>
                <Text className="text-gray-600 w-7/12">{resaddress}</Text>
            </View>

            <View className="flex flex-row justify-between gap-x-4">
                <Text className="w-4/12 font-semibold">Pincode:</Text>
                <Text className="text-gray-600 w-7/12">{respincode}</Text>
            </View>

            <View className="flex flex-row justify-between gap-x-4">
                <Text className="w-4/12 font-semibold">Booking Time:</Text>
                <Text className="text-gray-600 w-7/12">{reservationtime}:00</Text>
            </View>

            <TouchableOpacity className="py-1 px-4 bg-green w-full rounded-md" onPress={DownloadReceipt}>
                <Text className="font-semibold text-white text-md mx-auto">Download Receipt</Text>
            </TouchableOpacity>
        </View>

    )
}

export default ReservationCard