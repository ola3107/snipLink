import { LuLink2Off } from "react-icons/lu";
import { BsQrCode } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { FaHouseUser } from "react-icons/fa";
import { GiHelp } from "react-icons/gi";
import { HiBellAlert } from "react-icons/hi2";
import { IconType } from 'react-icons';
import { lusitana } from "./font";

export interface Feature {
    icon: IconType;
    title: string;
    description: string;
}
const features: Feature[] = [
    {
        icon: LuLink2Off,
        title: "Link Shortening",
        description: "Use SnipLink to transform those long, simple URLs! Turn them into short, quick links that are a breeze to share. Customize your links, and make them interesting and easy to remember. Say goodbye to the boring links and say hello to SnipLink!"
    },
    {
        icon: BsQrCode,
        title: "QR Code Generation",
        description: "QR codes are a powerful tool for marketers and business. With SnipLink, you can create custom QR codes for your links in seconds. Use it on printing supplies, packaging, business cards, and more. Making it easy for people to access your content with a QR code from SnipLink!"
    },
    {
        icon: SiGoogleanalytics,
        title: "user-management",
        description: "Track the performance of your links with SnipLink's powerful analytics dashboard. Monitor clicks, geographic location, device type, and more. Gain valuable insights into your audience and optimize your marketing efforts. With SnipLink, you'll always know how your links are performing."
    },
    {
        icon: FaHouseUser,
        title: "User-Friendly Interface",
        description: "SnipLink is designed with you in mind. Our user-friendly interface makes it easy to create, manage, and track your links. Whether you're a seasoned marketer or new to the game, SnipLink is the perfect tool for all your link shortening needs. Get started today and see the difference SnipLink can make!"
    },
    {
        icon: GiHelp,
        title: "Help and Support",
        description: "Need help with SnipLink? Our dedicated support team is here to help. Whether you have a question about our products or need help with your account, we are here to help. Contact us via email, chat, or phone, and we will get back to you as soon as possible. With SnipLink, you're never alone."
    },
    {
        icon: HiBellAlert,
        title: "Real-Time Notifications",
        description: "Stay up-to-date with SnipLink's real-time notifications. Receive alerts when your links are clicked, track your link performance, and stay informed about your audience's behavior. With SnipLink, you'll always be in the know."
    }
]


export default function Features() {

    return (
        <div className="py-16" id="features">
            <h1 className="text-3xl text-center font-bold my-10">What We Offer</h1>
            <div className="flex flex-wrap justify-center gap-10 mt-16 ">
                {features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                        <div key={index} className="md:max-w-xs w-[350px] border-2 p-4 text-justify rounded-2xl">
                            <div className={`${lusitana.className} an`}>
                                <FeatureIcon className="text-4xl"/>
                                <h4 className="mt-6 text-xl font-semibold">{feature.title}</h4>
                                <p className="mt-3 italic">{feature.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}