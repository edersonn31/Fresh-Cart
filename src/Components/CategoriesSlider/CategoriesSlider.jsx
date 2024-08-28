import Slider from 'react-slick';
import useCategories from './../../Hooks/useCategories';

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 2,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  let categories = useCategories();

  return (
    <>
      <div className="row">
        <h3 className="font-medium text-3xl my-4  text-center ">shop popular Categories</h3>
      <div className="slider-container">
      <Slider {...settings}>
          {categories?.data?.data.data.map((category, index) => (
            <div className="my-3" key={index}>
              <img src={category.image} className="w-full h-[200px]" alt="" />
              <h2 className='text-2xl font-semibold text-center'>{category.name}</h2>
            </div>
          ))}
        </Slider>{" "}
      </div>
      </div>
    </>
  );
}
