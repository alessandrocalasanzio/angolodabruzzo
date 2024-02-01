import React from "react";
import Panorama from "../img/Panorama.avif";
import angoloGrigio from "../img/angoloGrigio.avif";
import entrataAbruzzo from "../img/lavagnanag.avif";
import Carousel from 'react-bootstrap/Carousel';
import ProgressiveImage from "react-progressive-image-loading";

import titolari from "../img/titolari.png";
let imageList=[];


class Carosello extends React.Component {

    componentDidMount() {
        imageList = [Panorama,angoloGrigio,entrataAbruzzo,titolari]
        imageList.forEach((image) => {
            new Image().src = image
        });
    }

    render() {
        return (
            <div>
                <Carousel>
                   
                    <Carousel.Item>
                        <img className="d-block w-100 caroselloResize"src={Panorama} alt="First slide" />
                    </Carousel.Item>
                  
                    <Carousel.Item>
                        <img className="d-block w-100 caroselloResize"src={angoloGrigio} alt="2 slide" />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100 caroselloResize"src={entrataAbruzzo} alt="3 slide" />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100 caroselloResize"src={titolari} alt="4 slide" />
                    </Carousel.Item>
                    
                </Carousel>
            </div>
        );
    }
}
export default Carosello;