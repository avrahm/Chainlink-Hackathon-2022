import Image from "next/image";
import styles from "../styles/Home.module.css";

export const Home = () => {
  return (
    <div>
      <div className="flex-col md:flex-row flex md:items-center md:justify-center">
        <div>
          <h1 className="text-7xl mb-5 font-semibold">
            <span className="text-green-500 pt-10">Sports</span>Vybe
          </h1>
          <h4 className="text-2xl text-gray-600">
            Connecting People to Recreational Sports
          </h4>
          <p className="text-lg pt-3 text-gray-600">
            The easiest way to find pickup games, sport leagues, & recreational{" "}
            <br />
            facilities - All in the palm of your hand!
          </p>
          <h4 className="pt-5 font-serif font-thin text-gray-600 text-lg">
            For Both Web and Mobile Devices
          </h4>
        </div>

        <div>
          <img
            src="/heroSecImg.png"
            alt="SportsVybe header"
            width={600}
            height={800}
          />
        </div>
      </div>

      <div>
        <h2 className="text-center text-3xl font-semibold mt-16">
          How <span className="text-green-500">SPORTS</span>VYBE works:
        </h2>
        <h4 className=" text-center mt-2 text-md">
          Our Mission is to improve the health in our community through fitness
          and sociability.
        </h4>
      </div>
      <section className=" mt-10">
        <div className="flex md:flex-row flex-col md:justify-around ">
          <div className="rounded-lg shadow-lg bg-white w-80 hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out ">
            <img
              className="rounded-t-xl"
              src="https://media.istockphoto.com/photos/ball-is-connecting-us-picture-id1085308182?k=20&m=1085308182&s=612x612&w=0&h=9OA_mFvT2KiiiEKqcpi1A29ogXAFk28lKjwua3_e0bI="
              alt=""
            />
            <div className="pt-4 px-4 pb-12">
              <p className="font-bold text-base py-2">Connect Your Wallet and create an account</p>
              <p>
                Find people that love the sport just as much as you do. Be a
                part of your local community.
              </p>
            </div>
          </div>
          <div className="rounded-lg shadow-lg bg-white w-80 hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out">
            <img className="rounded-t-xl" src="/Section1.jpg" alt="" />
            <div className="pt-4 px-4 pb-12">
              <p className="font-bold text-base py-2">Set up preferences</p>
              <p>
                10+ Sports: Football, Basketball, Baseball, Ultimate Frisbee,
                Hockey, Tennis, Softball, Volleyball and many more!
              </p>
            </div>
          </div>
          <div className="rounded-lg shadow-lg bg-white w-80 hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out">
            <img className="rounded-t-xl" src="/AM.PNG" alt="" />
            <div className="pt-4 px-4 pb-12">
              <p className="font-bold text-base py-2">
                Get active and win Challenges!
              </p>
              <p>
                Connect & challenge with several other users/teams, win and earn
                rewards from challenges!
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-20">
        <h1 className="text-3xl mb-2">
          Basic Features of <span className="text-green-500 ">Sports</span>vybe
        </h1>
        <p className="mb-5 text-bold text-gray-500">
          With over 200 parks and local venues we are add more everyday.
        </p>
        <div className="flex align-center my-3">
          <img
            src="/check-mark.png"
            alt=""
            className="h-5 rounded-full mr-3 mt-1"
          />
          <p className="text-md">
            FitFeed: The feed will display upcoming events, recent check-ins,
            facilities and events based on your preferences.
          </p>
        </div>
        <div className="flex align-center my-3">
          <img
            src="/check-mark.png"
            alt=""
            className="h-5 rounded-full mr-3 mt-1"
          />
          <p className="text-md">
            Search: Our unique algorithm makes it easy to find venues,
            check-ins, and events.
          </p>
        </div>
        <div className="flex align-center my-3">
          <img
            src="/check-mark.png"
            alt=""
            className="h-5 rounded-full mr-3 mt-1"
          />
          <p className="text-md">
            Discover: On our platform you can find pickup games, leagues,
            tournaments, or practices. Narrow down your results with the advance
            filter.
          </p>
        </div>
        <div className="flex align-center my-3">
          <img
            src="/check-mark.png"
            alt=""
            className="h-5 rounded-full mr-3 mt-1"
          />
          <p className="text-md">
            Create: Create your own activity. Post to the community your pickup
            game if you need extra player. (Are you a coach or run a league,
            contact us directly)
          </p>
        </div>
      </div>
    </div>
  );
};
