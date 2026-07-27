import React from "react";
import Privacy from "./privacy";
import Cookie from "./Cookie";

import LogoVlecvi from "../img/LogoVlecvi.png";
class Footer extends React.Component{
    render(){
        return(
<div >
<table  className="table">
    
    <tr as="tbody">

    <th scope="col"><p className="testSx">
          <nobr>
          <th scope="col"><p><nobr>  <Privacy/>&nbsp;&nbsp;<Cookie/></nobr></p></th>

      </nobr>
          </p></th>
      <th scope="col">
        <p className="testCx">Da Giannino L'angolo D'Abruzzo &copy;2026.<br/> Tutti i diritti riservati.</p>

</th>
      <th scope="col"><p className="testDx">
          <nobr>
      <a className="fb" href="https://it-it.facebook.com/angolodabruzzo1/" aria-label="Facebook"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a>
      <a className="ig" href="https://www.instagram.com/angolodabruzzo/" aria-label="Instagram"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a>
      <a className="tree" href="https://linktr.ee/AngoloDabruzzo" aria-label="Linktree"><i className="fa fa-tree fa-2x" aria-hidden="true"></i></a>
      </nobr>
          </p>
          </th>
    </tr>
  </table>
  <p className="testDx">Designed By <img src={LogoVlecvi} height={"40px"} width={"28px"} alt="Logo Vlecvi"/><a class="vlecviname"  href="https://www.vlecvi.com"> Vlecvi</a></p>
</div>
        )
    }
}

export default Footer;