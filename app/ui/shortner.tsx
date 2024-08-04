import {Btn} from "./button"

export default function Shortner() {

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const form = e.currentTarget as HTMLFormElement
    //     const input = form.querySelector("input") as HTMLInputElement
    //     const url = input.value
    // }
    return (
        <div className="flex justify-center py-20 bg-slate-400 px-3 rounded-2xl" id="shortner">
            <form action="" className="w-[500px] border text-center px-4 py-5 rounded-2xl shadow-xl">
                <h1 className="text-xl font-bold">Try Out Our Sleak Shortner</h1>
                <input type="text" placeholder="Shorten a link here..." id="shortLink" className="w-full py-3 px-3 my-4 rounded-xl"/>
                <div>
                    <Btn name="Shorten it" href="/"/>
                </div>
            </form>
        </div>
    )
}