import React from "react";

import Carosello from "./5.carosello";
import Testocarosello from "./6.testocarosello";

class ScheletroStoria extends React.Component {

    render() {

        return (
            <div>
                <div className="container-fluid " data-aos="fade-up" data-aos-mirror='false' data-aos-once='true'>
                    <div className="row">
                        <div className=" col-md-5 marginColonna">
                            <Carosello/>
                        </div>
                        
                        <div className="col-md-7 marginColonna text-center" style={{backgroundColor:'rgb(230, 183, 96)'}}>
                     
                            <Testocarosello/>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ScheletroStoria;