import Image from "next/image";
import styles from "../styles/Home.module.css";

export const Home = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
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
        <h2 className="text-center text-3xl text-semibold mt-8">
          How SPORTS<span className="text-green-500">VYBE</span> works:
        </h2>
        <h4 className=" text-center mt-2 text-lg">
          Our Mission is to improve the health in our community through fitness
          and sociability.
        </h4>
      </div>
      <section className=" mt-10">
        <div className="flex justify-around">
          <div className="rounded-lg shadow-lg bg-white w-80 hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out">
            <img
              className="rounded-t-xl"
              src="https://media.istockphoto.com/photos/ball-is-connecting-us-picture-id1085308182?k=20&m=1085308182&s=612x612&w=0&h=9OA_mFvT2KiiiEKqcpi1A29ogXAFk28lKjwua3_e0bI="
              alt=""
            />
            <div className="pt-4 px-4 pb-12">
              <p className="font-bold text-base py-2">Connect Your Wallet</p>
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
                Hockey, Tennis, Softball, Volleyball and more to come!
              </p>
            </div>
          </div>
          <div className="rounded-lg shadow-lg bg-white w-80 hover:shadow-2xl transition ease-in-out delay-100  hover:ease-in-out">
            <img
              className="rounded-t-xl"
              src="/AM.PNG"
              alt=""
            />
            <div className="pt-4 px-4 pb-12">
              <p className="font-bold text-base py-2">Get active and win Challenges!</p>
              <p>
                Connect & compete with several other teams, win and earn rewards from challenges
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
