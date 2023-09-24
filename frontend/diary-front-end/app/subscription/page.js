'use client'
import axios from "axios"
import { useState, useEffect } from "react"
import Subcard from "@/src/components/subcard"



export default function page() {

    const [prices, setPrices] = useState([])

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const {data} = await axios.get('api/getproducts')
        setPrices(data)
    }

    return (
        <section className="w-full">
              <div className="mx-auto max-w-4xl text-center mt-10 items-center">
                   <h2 className="text-3xl font-semibold leading-7 text-amber-500">Subscriptions</h2>
                   <br/>
                   <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Secure more Valuables!</p>
                   <br/>
                   <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">Check out all the information below</p>
                   <br/>
                   <br/>
              </div>
              <div className="grid sm:grid-cols-4 gap-8 max-w-7xl items-center mx-auto">
                {prices && prices.map((price) => (
                 <Subcard price={price} key={price.id} />
                ))}
              </div>

              <br/><br/>
        </section>
       )
}
