import React from "react";

class Titoli extends React.Component{

  render(){
    return(
      <div className="container-fluid contenitoreMinimo">
      <div className="titoloStoria" data-aos="fade-right" data-aos-mirror='false' data-aos-once='true'>
        {this.props.title}
      </div>

      </div>

    )
  }
}

export default Titoli;