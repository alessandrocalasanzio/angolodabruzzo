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
        <Navbar
          expand="lg"
          fixed="top"
          className={this.state.activeHeader ? "test1" : ""}
          expanded={this.state.navbarExpanded}
          onToggle={(expanded) => this.setState({
            navbarExpanded: expanded,
            activeHeader: expanded ? true : window.scrollY >= this.state.headerBreakPoint
          })}
        >
          <Navbar.Brand className={this.state.activeHeader ? "noImg" : ""} href="#1"></Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
              <Nav as="ul" className="mx-auto nav-item justify-content-center" onClick={(e) => {
                if (!e.target.closest('.dropdown-toggle')) {
                  this.setState({ navbarExpanded: false });
                }
              }}>
                <li className="nav-item">
                  <AnchorLink  href='#home' className="nav-link contrasto">
                    Home
                  </AnchorLink>
                </li>


                <NavDropdown title={<span className="contrasto">Menu</span>} id="basic-nav-dropdown">

                  <NavDropdown.Item as="li" tag="a" href={PDF} download="MenuAngoloDabruzzo.pdf" className="nav-link-dropdown contrasto">
                   Scarica il nostro menu
                  </NavDropdown.Item>

                  <NavDropdown.Item as="li"  className="nav-link-dropdown">
                  <AnchorLink  href='#menu' className="nav-link-dropdown">
                    Guarda il nostro menu
                    </AnchorLink>
                  </NavDropdown.Item>
                </NavDropdown>


                <li className="nav-item">
                  <AnchorLink href='#chisiamo' className="nav-link contrasto">
                    <nobr>Chi siamo</nobr>
                  </AnchorLink>
                </li>


                <li className="nav-item">
                  <AnchorLink  href='#galleria' className="nav-link contrasto">
                    Galleria
                  </AnchorLink>
                </li>

                <li className="nav-item">
                  <AnchorLink  href="#contatti" className="nav-link contrasto" >
                    Contatti
                  </AnchorLink>
                </li>
              </Nav>

          </Navbar.Collapse>
        </Navbar>

        
      </div>
     
    );
  }
}
