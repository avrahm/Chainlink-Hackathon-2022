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
          <h4 className="text-2xl text-gray-500">
            Connecting People to Recreational Sports
          </h4>
          <p className="text-lg pt-3 text-gray-500">
            The easiest way to find pickup games, sport leagues, & recreational{" "}
            <br />
            facilities - All in the palm of your hand!
          </p>
          <h4 className="pt-5 font-serif font-thin text-gray-500 text-lg">
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
        <h3 className="text-3xl text-center mt-6">
          OUR <span className="text-green-500">MISSION</span>:
        </h3>
        <h2 className=" text-center mt-2">
          Our Mission is to improve the health in our community through fitness
          and sociability.
        </h2>
          </div>
          
          <div>
              <h2>How SportsVybe Works:</h2>
          </div>
    </div>
  );
};
