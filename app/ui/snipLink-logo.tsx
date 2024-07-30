import { CgLink } from "react-icons/cg";
import { lusitana } from "./font";

export default function SnipLinkLogo() {
  return (
    <div className={`${lusitana.className} flex items-center`}>
        <CgLink className="text-5xl" />
        <h1 className="text-xl font-bold">SnipLink</h1>
    </div>
  )
}