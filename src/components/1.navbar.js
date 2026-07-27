import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import angolo from "../img/EntrataAbruzzo.avif";
import PDF from "../pdf/MenuAngoloDabruzzo.pdf";

import AnchorLink from 'react-anchor-link-smooth-scroll';

import ProgressiveImage from "react-progressive-image-loading";

export default class TransNavigationBar extends Component {

  state = {
    headerBreakPoint: 50,
    activeHeader: false,
    navbarExpanded: false
  };

  componentDidMount() {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      if (scrollY >= this.state.headerBreakPoint) {
        this.setState({
          activeHeader: true
        });
      } else if (
        scrollY < this.state.headerBreakPoint &&
        this.state.navbarExpanded === false
      ) {
        this.setState({
          activeHeader: false
        });
      }
    });
  }

 




  render() {
   
    return (
      
      <div>
        
          <div className="box">
          <ProgressiveImage
    preview={angolo}
    src={angolo}
    render={(src) => <img src={src} alt="Ingresso dell'Angolo d'Abruzzo"/>}
/>
          <a type="button" href={PDF} download="MenuAngoloDabruzzo.pdf" className="btn btn-danger wiggle">
                    Scarica il nostro Menu
           </a>
          </div>
        <nav className={`navbar navbar-expand-lg fixed-top ${this.state.activeHeader ? "test1" : ""}`}>
        <a className={`navbar-brand ${this.state.activeHeader ? "noImg" : ""}`}href="#1">
            </a>

          <Navbar> 
              <Nav className="mx-auto nav-item justify-content-center">
                <Nav.Item >
                  <Nav.Link as="li">
                    <AnchorLink  href='#home' className="nav-link contrasto">
                      Home
                    </AnchorLink>
                  </Nav.Link>
                </Nav.Item>


                <NavDropdown title={<span className="nav-link contrasto">Menu</span>} id="basic-nav-dropdown">
                 
                  <NavDropdown.Item as="li" tag="a" href={PDF} download="MenuAngoloDabruzzo.pdf" className="nav-link-dropdown contrasto">
                   Scarica il nostro menu
                  </NavDropdown.Item>

                  <NavDropdown.Item as="li"  className="nav-link-dropdown">
                  <AnchorLink  href='#menu' className="nav-link-dropdown">
                    Guarda il nostro menu
                    </AnchorLink>
                  </NavDropdown.Item>
                </NavDropdown>


                <Nav.Item >
                  <Nav.Link as="li" >
                  <AnchorLink href='#chisiamo' className="nav-link contrasto">
                      <nobr>Chi siamo</nobr>
                    </AnchorLink>
                  </Nav.Link>
                </Nav.Item>


                <Nav.Item  >
                  <Nav.Link as="li" >
                    <AnchorLink  href='#galleria' className="nav-link contrasto">
                      Galleria
                    </AnchorLink>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item >
                  <Nav.Link as="li">
                    <AnchorLink  href="#contatti" className="nav-link contrasto" >
                      Contatti
                    </AnchorLink>
                  </Nav.Link>
                </Nav.Item>
              </Nav>

          </Navbar>
        </nav>

        
      </div>
     
    );
  }
}
