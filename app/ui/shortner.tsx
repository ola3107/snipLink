import LoginModal from "./login-modal";

export default function Shortner() {
    return (
        <div className="flex justify-center py-20 bg-slate-400 px-3 rounded-2xl" id="shortner">
                <form action="" className="w-[500px] border text-center px-4 py-5 rounded-2xl shadow-xl">
                    <h1 className="text-xl font-bold">Try Out Our Sleak Shortner</h1>
                    <input
                    type="text"
                    placeholder="Shorten a link here..."
                    id="shortLink"
                    name="shortLink"
                    className="w-full py-3 px-3 my-4 rounded-xl"/>
                    <div>
                        <LoginModal text={"Create Short Url"} />
                    </div>
                </form>
        </div>
    )
}