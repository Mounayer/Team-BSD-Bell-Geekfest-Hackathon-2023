'use client'
import axios from "axios"
import Link from "next/link"


const Subcard = ({ price }) => {

    const handleSubscriptions = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/api/payment',
            {
                priceId: price.id,
                method: price.type,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        window.location.assign(data)
    }

    return (
        <>
            <div class="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-8 bg-gray-800">
                <h5 class="mb-4 text-xl font-medium text-amber-500">{price.nickname}</h5>
                <div class="flex items-baseline text-gray-900 dark:text-white">
                    <span class="text-3xl font-semibold"></span>
                    <span class="text-3xl font-extrabold tracking-tight">{(price.unit_amount / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'CAD'
                    })}</span>
                    <span class="ml-1 text-xl font-normal text-white">/month</span>
                </div>


                {price.nickname === 'Free' ? (
                    <>
                        <ul role="list" class="space-y-5 my-7">
                            <li class="flex space-x-3 items-center">
                                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="text-base font-normal leading-tight text-white">
                                    200MB storage for basic needs.
                                </span>
                            </li>
                        </ul>
                    </>
                ) : price.nickname === 'Helmet (Bronze)' ? (
                    <>
                        <ul role="list" class="space-y-5 my-7">
                            <li class="flex space-x-3 items-center">
                                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="text-base font-normal leading-tight text-white">
                                1GB storage for essential files
                                </span>
                            </li>
                        </ul>
                    </>
                ) : price.nickname === 'Shield (Silver)' ? (
                    <>
                        <ul role="list" class="space-y-5 my-7">
                            <li class="flex space-x-3 items-center">
                                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="text-base font-normal leading-tight text-white">
                                15GB storage for moderate users
                                </span>
                            </li>
                        </ul>
                    </>
                ) : price.nickname === 'Titanium-Vault (Gold)' ? (
                    <>
                        <ul role="list" class="space-y-5 my-7">
                            <li class="flex space-x-3 items-center">
                                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="text-base font-normal leading-tight text-white">
                                50GB storage for power users
                                </span>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <ul role="list" class="space-y-5 my-7">
                            <li class="flex space-x-3 items-center">
                                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="text-base font-normal leading-tight text-white">
                                    No Storage
                                </span>
                            </li>
                        </ul>
                    </>
                )}

                <br/>
                <br/>
                <br/><br/><br/><br/>

                {price.unit_amount === 0 ? (
                    <button
                        onClick={handleSubscriptions}
                        type="button"
                        class="text-white bg-blue-600 pointer-events-none opacity-50 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                    >
                        Owned
                    </button>
                ) : (
                    <button
                        onClick={handleSubscriptions}
                        type="button"
                        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                    >
                        Choose plan
                    </button>
                )}
            </div>
        </>



    )
}

export default Subcard