import React from "react";
import "../Item/item.scss";

// Définition du composant fonctionnel `Item` qui prend en entrée des props
function Item({ image, descriptionImage, title, description }) {
  return (
    // Conteneur principal de l'élément de fonctionnalité
    <div className="feature-item">
      <img src={image} alt={descriptionImage} className="feature-item-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Item;