import {Btn} from "./button"
import { lusitana } from "./font"
import { BsQrCode } from "react-icons/bs";
import { FaLinkSlash } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import LoginModal from "./login-modal";

export default function Hero() {
    return (
        <div className="flex justify-center text-center py-10 md:py-20" id="hero">
            <div className="max-w-2xl mt-10 md:mt-10">
                <h1 className="text-5xl md:font-bold font-semibold">Enhance Digital Engagement With SnipLink</h1>
                <div className={`${lusitana.className}`}>
                    <h3 className="text-xl mt-6 md:font-semibold">Personalize your shortened URLs to align with your brand identity. Utilize custom slugs, branded links, and domain customization options to reinforce your brand presence and enhance user engagement.</h3>
                </div>
                <div className="md:text-xl text-xl mt-6">
                    <LoginModal text={"Get Started"} />
                </div>
                <div className="flex w-full mt-28 gap-16 justify-center flex-wrap">
                    <div className="flex flex-col items-center">
                        <FaLinkSlash className="text-4xl"/>
                        <h4 className="">Link Shortening</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <BsQrCode className="text-4xl "/>
                        <h4 className="">QR Code Generation</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <SiGoogleanalytics className="text-4xl "/>
                        <h4 className="">Analytics Dashboard</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}