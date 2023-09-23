'use client'
import axios from "axios"
import Link from "next/link"


const Subcard = ({ price }) => {

    const handleSubscriptions = async (e)=> {
        e.preventDefault();
        const {data} = await axios.post('/api/payment',
        {
            priceId: price.id
        },
        {
            headers:{
                "Content-Type": "application/json",
            },
        }
        );
        window.location.assign(data)
    }

    return (
        <>
            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{price.nickname}</h5>
                <div class="flex items-baseline text-gray-900 dark:text-white">
                    <span class="text-3xl font-semibold">$</span>
                    <span class="text-3xl font-extrabold tracking-tight">{(price.unit_amount / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'CAD'
                    })}</span>
                    <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <br /><br /><br /><br />
                <button onClick={handleSubscriptions}type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
            </div>
        </>
    )
}

export default Subcard