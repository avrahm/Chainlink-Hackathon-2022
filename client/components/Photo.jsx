import Image from "next/image";
import styles from "../styles/Home.module.css";

export const Photo = ({ src, alt, size, type, h, w, isLoading = true }) => {
    const styleSize = size == "sm" ? styles.imageContainerSmall : styles.imageContainerLarge;

    const placeholderImg = type == "profile" ? "/images/profile_placeholder.png" : "/images/team_placeholder.jpeg";

    console.log(isLoading, src, placeholderImg);
    return (
        <div className={styleSize}>
            {!isLoading && src !== undefined ? (
                <Image src={src} alt={alt} layout="fill" objectFit="cover" priority />
            ) : (
                <Image src={placeholderImg} alt={`${type} placeholder`} layout="fill" objectFit="cover" priority />
            )}
        </div>
    );
};
