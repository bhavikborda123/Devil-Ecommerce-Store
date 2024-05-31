import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { Toaster } from "react-hot-toast";
import { HomeContext } from ".";
import { sliderImages } from "../../admin/dashboardAdmin/Action";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
    const { data, dispatch } = useContext(HomeContext);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
    
        sliderImages(dispatch)
    
        const intervalId = setInterval(() => {
            setSlide(prevSlide => (prevSlide + 1) % data.sliderImages.length);
        }, 3000); // Change slide every 3 seconds
    
        return () => {
            clearInterval(intervalId); // Cleanup interval on component unmount
        };
    }, [dispatch, data.sliderImages.length]);

    return (
        <Fragment>
            <div className="relative mt-10 bg-gray-100 border-2">
                {data.sliderImages.length > 0 && (
                    <img
                        className="w-full"
                        src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
                        alt="sliderImage"
                        style={{
                            height: "70vh",
                        }}
                    />
                )}
            </div>
            <OrderSuccessMessage />
            <Toaster position="bottom-right" reverseOrder={false} />
        </Fragment>
    );
};

export default Slider;
