import SnipLinkLogo from "./snipLink-logo"
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="flex justify-center pt-10 border-t-2 pb-5">
            <div>
                <div className="flex justify-center">
                    <SnipLinkLogo />
                </div>
                <div>
                    <p>&#169;{year} SnipLink | Olasunkanmi</p>
                </div>
            </div>
            
        </div>
    )
}