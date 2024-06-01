import PropTypes from "prop-types";

const Header = ({ title, userName, userStatus, profilePicture }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  Header.propTypes = {
    title: PropTypes.string,
    userName: PropTypes.string,
    userStatus: PropTypes.string,
    profilePicture: PropTypes.string,
  };

  return (
    <div className="bg-primary-600 text-white font-primary fixed w-full lg:static z-40">
      <div className="flex h-20 place-content-between container mx-auto">
        <h1 className="font-medium lg:pl-24 ml-16 left-0 place-content-center text-xl ">
          {title}
        </h1>
        <div className="flex gap-3 lg:items-center mr-7">
          <div className="place-content-center lg:w-12 w-10 lg:block hidden">
            <img src={profilePicture} alt="Profil" className="rounded-full" />
          </div>
          <div className="place-content-center lg:block hidden">
            <h1 className="font-semibold lg:text-base">
              {truncateText(userStatus, 14)}
            </h1>
            <p className="text-xs lg:hidden block">
              {truncateText(userName, 14)}
            </p>
            <p className="text-xs lg:block hidden">{userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
