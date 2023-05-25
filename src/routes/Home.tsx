import { Link } from "react-router-dom";

export const Home = () => {

    return (
        <main className="w-full h-full relative overflow-hidden">
            <div className="flex pl-28 pt-10">
                <h1 className="text-5xl font-bold self-start">Meal Planner</h1> 
            </div>
            <div className="flex w-full flex-col items-center h-full justify-between py-16">
                <h2 className="text-2xl flex w-[46rem] items-center justify-center justify-self-start mt-0">
                Never think about what's for dinner again! <br/>
                Get started with a <span className="text-warmth font-bold contents"> free account</span> or sign in
                </h2>
                <p className="max-w-lg leading-10 text-xl mb-20">
                It's time to stop spending your days wondering what you should eat for dinner. 
                With Meal Planner, all you have to do is enter in your own favorite recipes and 
                <span className="font-bold italic"> voila! </span> Your recipes are automagically mixed up and scheduled on a specific day!
                </p>
                {/* <Link to='/login'>Sign In or Guest Log in</Link>
                <Link to='/register'>Register</Link> */}
            </div>
            <div className="bg-noon-sky/75 w-[46.5rem] h-[46.5rem] rounded-full absolute left-[23vw] top-[43vh] -z-10"></div>
            <div className="bg-sea-turtle w-[51rem] h-[51rem] rounded-full absolute -z-20 -left-[12vw] top-[64vh]"></div>
            {/* decorative divs */}
            <div></div>
        </main>
    )
}