import { lusitana } from "./font";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import LoginModal from "./login-modal";

import {Btn} from "./button";

export default function Pricing() {
    return (
        <div className='pb-20' id="pricing">
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold">Simple and Affordable</h1>
                <div className={`${lusitana.className} antialiased max-w-lg mx-auto mt-2`}>
                    <p className="font-semibold text-lg ">Our plans are straight forward and easy to understand. No hidden fees, no extra charges.</p>
                </div>
            </div>
            <div className='flex justify-center flex-wrap gap-4 mt-10'>
                <div className='py-2 border  px-6 py-6 rounded-2xl'>
                    <div className="border-b-2 ">
                        <h2 className="text-2xl text-center font-bold">Free</h2>
                    </div>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/> For small teams or office</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/> Free forever</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/> Up to 10 users</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/> Basic access to all features</p>
                    <div className="flex justify-center mt-8">
                    <LoginModal />
                    </div>
                </div>
                <div className='py-2 border  p-6 py-6 rounded-2xl'>
                    <div className="border-b-2 ">
                        <h2 className="text-2xl text-center font-bold">Pro</h2>
                    </div>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/>For larger teams or office</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/>Starting at $10 per user</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/>Up to 100 users</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/>Additional features</p>
                    <div className="flex justify-center mt-8">
                    <LoginModal />
                    </div>
                </div>
                <div className='py-2 border  p-6 py-6 rounded-2xl'>
                    <div className="border-b-2 ">
                        <h2 className="text-2xl text-center font-bold">Enterprise</h2>
                    </div>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/>For large organizations</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/>Custom pricing</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/>Unlimited users</p>
                    <p className="mt-4 text-md"><IoMdCheckmarkCircleOutline  className="inline text-blue-900 dark:text-blue-200 mr-3"/>Premium features</p>
                    <div className="flex justify-center mt-8">
                    <LoginModal />
                    </div>
                </div>
            </div>
        </div>
    );
}