import React from 'react';
import Fade from 'react-reveal/Fade';

const LoadingContainer = () => {
  
  return (
    <>
      {(
        <div className="sfondoLoading">
          <div align="center">
            <div className="cornice">
              <div className="cornice-inner">
                <Fade duration={9000}>
                  <h1 className="nameload">Benvenuti Da Giannino</h1>
                  <h1 className="nameload">L'Angolo D'Abruzzo</h1>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingContainer;
