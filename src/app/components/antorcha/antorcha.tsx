import React from 'react';
import './TorchComponent.css'; // Importamos los estilos necesarios

const TorchComponent: React.FC = () => {
  return (
    <label className="container">
      
      <input defaultChecked={true} type="checkbox" />
      <div className="checkmark"></div>
      <div className="torch">
        <div className="head">
          <div className="face top">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="face left">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="face right">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="stick">
          <div className="side side-left">
            {/* Se repiten múltiples divs para la estructura de la antorcha */}
            {Array.from({ length: 16 }).map((_, idx) => (
              <div key={idx}></div>
            ))}
          </div>
          <div className="side side-right">
            {/* Se repiten múltiples divs para la estructura de la antorcha */}
            {Array.from({ length: 16 }).map((_, idx) => (
              <div key={idx}></div>
            ))}
          </div>
        </div>
      </div>
    </label>
  );
};

export default TorchComponent;
