import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* features */}
      <div className={`${styles.section} sm:block `}>
        <div
          className={`${styles.section}  my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* categories */}
      <div className={`${styles.section} `} id="categories">
        <div className={`${styles.heading}`}>
          <h1>Categories</h1>
        </div>
        <div className="bg-white p-6 rounded-lg mb-12 grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-3.5 ">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full flex flex-col gap-4 items-center cursor-pointer border border-slate-300 p-[10px] hover:shadow-md hover:-translate-y-3 hover:scale-[110%] duration-200 rounded-md "
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <img
                    src={i.image_Url}
                    alt={i.title}
                    className="w-[60%] h-[60%] object-cover"
                  />
                  <h5 className={`text-[18px] text-center leading-[1.3] `}>
                    {i.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
