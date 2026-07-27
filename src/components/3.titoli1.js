import React from "react";

class Titoli1 extends React.Component{

  render(){
    return(
      <div className="container-fluid contenitoreMinimo">
      <div className="titoloStoria titoloStoria1" data-aos="fade-left" data-aos-mirror='false' data-aos-once='true'>
        {this.props.title}
      </div>
      </div>

    )
  }
}

export default Titoli1;