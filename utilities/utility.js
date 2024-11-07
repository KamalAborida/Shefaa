import twitterIcon from "../assets/icon-twitter.svg";
import facebookIcon from "../assets/icon-facebook.svg";
import youtubeIcon from "../assets/icon-youtube.svg";
import tiktokIcon from "../assets/icon-tiktok.svg";
import linkedinIcon from "../assets/icon-linkedin.svg";
import instagramIcon from "../assets/icon-instagram.svg";
import twitchIcon from "../assets/icon-twitch.svg";

export const getSocialMediaIcon = (socialMediaName) => {
  socialMediaName = socialMediaName.toLowerCase()

  const icons = {
    twitter: twitterIcon,
    facebook: facebookIcon,
    youtube: youtubeIcon,
    tiktok: tiktokIcon,
    linkedin: linkedinIcon,
    instagram: instagramIcon,
    twitch: twitchIcon,
  };

  return icons[socialMediaName] || null; // Return null if the social media name does not exist in the icons object
};

// // Example usage:
// const icon = getSocialMediaIcon('facebook'); // This will return facebookIcon
// console.log(icon);
