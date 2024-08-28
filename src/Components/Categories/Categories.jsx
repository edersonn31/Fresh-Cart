import useCategories from "../../Hooks/useCategories";
import Loading from "../Loading/Loading";

export default function Categories() {
  let { data, isLoading } = useCategories();

  return (
    <>
      {isLoading ? (
        <div className="center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {data?.data.data.map((category, index) => (
            <div className="sm:w-1/2 md:w-1/3 p-4 " key={index}>
              <div className="border border-gray-300 rounded-lg  transition-all duration-500 hover:border-none hover:shadow-[0px_0px_10px_rgba(34,197,94,1)] hover:scale-[1.03] group">
                <div
                  className="h-80 w-full bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <h2 className="text-center text-2xl py-4 ">{category.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
