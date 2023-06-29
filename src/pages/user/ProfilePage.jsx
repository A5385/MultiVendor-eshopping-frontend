import { useState } from "react";
import styles from "../../styles/styles";
import Header from "../../components/website/layout/Header";
import ProfileSideBar from "../../components/user/profile/ProfileSideBar";
import ProfileContent from "../../components/user/profile/ProfileContent";
import Loader from "../../components/website/layout/Loader";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(0);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div
            className={`${styles.section} min-w-[376px] flex bg-[#f5f5f5] py-12 my-8 md:py-5 md:my-0`}
          >
            <div className="w-[50px] md:w-[335px]  ">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>

            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
