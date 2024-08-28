import { useGetCart } from "../../Hooks/useGetCart";
import axios from "axios";
import { useState } from "react";
import Loading from "./../Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: cart, refetch } = useGetCart();
  const [details, setDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  
  // Error states for each input
  const [detailsError, setDetailsError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [cityError, setCityError] = useState('');

  const navigate = useNavigate();

  let shippingAddress = {
    details: details,
    phone: phone,
    city: city,
  };

  // Validation function to check if inputs are filled
  function isValid() {
    let valid = true;

    // Reset errors
    setDetailsError('');
    setPhoneError('');
    setCityError('');
    setApiError('');

    if (!details) {
      setDetailsError("Please enter your details.");
      valid = false;
    }
    if (!phone || !/^\d{10,15}$/.test(phone)) {
      setPhoneError("Please enter a valid phone number (10-15 digits).");
      valid = false;
    }
    if (!city) {
      setCityError("Please enter your city.");
      valid = false;
    }

    return valid;
  }

  async function handleCash() {
    if (!isValid()) return;

    try {
      setLoading(true);
      setApiError(null); // Reset previous errors
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.data._id}`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      refetch();
      setLoading(false);
      navigate("/allorders");
    } catch (error) {
      setLoading(false);
      setApiError(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  }

  async function handleCheckout() {
    if (!isValid()) return;

    try {
      setLoading(true);
      setApiError(null); // Reset previous errors
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      refetch();
      setLoading(false);
      window.location.href = response.data.session.url;
    } catch (error) {
      setLoading(false);
      setApiError(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  }

  return (
    <>
      <div className="mx-auto w-1/2 py-12 px-6 shadow-lg rounded-lg mt-4">
        <h1 className="text-3xl pb-2 font-semibold text-center">Checkout</h1>
        <form>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Details
            </label>
            {detailsError && <p className="text-red-500 text-xs mt-1">{detailsError}</p>}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Phone
            </label>
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your City
            </label>
            {cityError && <p className="text-red-500 text-xs mt-1">{cityError}</p>}
          </div>

          {apiError && <p className="text-red-500 text-xs mt-1">{apiError}</p>}

          <div className="flex items-center justify-between mt-6 flex-col gap-2">
            {loading ? (
              <Loading />
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full block px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Online
                </button>
                <hr />
                <button
                  type="button"
                  onClick={handleCash}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full block px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Cash
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
