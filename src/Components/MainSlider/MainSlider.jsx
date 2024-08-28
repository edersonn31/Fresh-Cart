import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/slider-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <>
      <div className="center flex-col md:flex-row flex-wrap my-2 w-3/4 mx-auto">
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <img src={slider1} className="w-full h-[400px]" alt="" />
            <img src={slider2} className="w-full h-[400px]" alt="" />
            <img src={slider3} className="w-full h-[400px]" alt="" />
          </Slider>{" "}
        </div>
        <div className="w-full md:w-1/4">
          <img src={img1} className="w-full h-[200px]" alt="" />
          <img src={img2} className="w-full h-[200px]" alt="" />
        </div>
      </div>
    </>
  );
}
