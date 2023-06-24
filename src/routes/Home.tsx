import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

export const Home = () => {

    return (
        <main className="w-full h-[100vh] relative overflow-hidden">
            <Logo />
            <div className="flex w-full flex-col items-center h-full justify-between py-16 pointer-events-auto ">
                <h2 className="text-2xl flex w-[46rem] items-center justify-center justify-self-start mt-0">
                Never think about what's for dinner again! <br/>
                Get started with a <Link to='/register' className="text-warmth font-bold contents"> free account</Link> or <Link className="contents" to='/login'>sign in</Link> 
                </h2>
                <div className="bg-noon-sky/75 w-[46.5rem] min-h-[46.5rem] rounded-full relative top-32 flex items-center justify-center pb-72">

                <p className="max-w-lg leading-10 text-xl mb-20 indent-8">
                It's time to stop spending your days wondering what you should eat for dinner. 
                With Meal Planner, all you have to do is enter in your own favorite recipes and 
                <span className="font-bold italic"> voila! </span> Your recipes are automagically mixed up and scheduled on a specific day!
                </p>
                </div>
            </div>
            {/* decorative divs */}
            <div className="bg-sea-turtle w-[51rem] h-[51rem] rounded-full absolute -z-10 -left-[4vw] top-[64vh]"></div>
            <div></div>
        </main>
    )
}