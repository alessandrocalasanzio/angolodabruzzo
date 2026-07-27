import React from 'react';
import styled from 'styled-components'
import Carousel from 'react-grid-carousel'

import guida from "../img/guidaMichelin.avif";
import gambero from "../img/gambero.avif";
import slurpy from "../img/slurpy.avif";
import guru from "../img/guru.avif";
import vivi from "../img/vivi.svg";
import golosario from "../img/golosario.png"


const images=[
  {id:'0',img:guida, link:"https://guide.michelin.com/it/it/lombardia/milano/ristorante/da-giannino-l-angolo-d-abruzzo"},
  {id:'1',img:gambero},
  {id:'2',img:golosario, link:"https://www.ilgolosario.it/it/i-nostri-dieci-1-ristoranti"},
  {id:'3',img:guru, link:"https://restaurantguru.it/Da-Giannino-LAngolo-dAbruzzo-Milan"},
  {id:'4',img:slurpy, link:"https://www.sluurpy.it/milano/ristorante/201812/da-giannino-l-angolo-d-abruzzo"},
  {id:'5', img:vivi, link:"https://vivimilano.corriere.it/ristoranti/tradizionali/langolo-dabruzzo/"}
]



const Container = styled.div`
  top: 0;
  width: 100%;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor:auto;
  
`

const Row = styled.div`
  max-width: 100%;
  margin: 0 0 0 0;
  padding:0px;
  cursor:auto;
  
`
const LogoLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  cursor: auto;
`;

const Logo = styled.div`
  background-image: ${({ images }) => `url(${images})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

// ...

const GalleriaLogo = () => {
  return (
    <div>
      <Container>
        <Row>
          <Carousel cols={3} rows={1} gap={15} loop={true} hideArrow={true} autoplay={2400} mobileBreakpoint={200} containerStyle={{ backgroundColor: "rgb(230, 183, 96)" }} responsiveLayout={[
            {
              breakpoint: 800,
              cols: 3
            },
            {
              breakpoint: 500,
              cols: 3
            }
          ]}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                {image.link ? (
                  <LogoLink href={image.link} target="_blank" rel="noreferrer">
                    <Logo>
                      <img alt="logo" className='imgLogo' src={image.img} />
                    </Logo>
                  </LogoLink>
                ) : (
                  <Logo>
                    <img alt="logo" className='imgLogo' src={image.img} />
                  </Logo>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      </Container>
    </div>
  );
}

export default GalleriaLogo;