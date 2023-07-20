import React from "react";

export default function useContextMenu({ onMenuItemClicked }) {
  const [isContextShown, setContextShown] = React.useState(false);
  const [xYPosistion, setXyPosistion] = React.useState({ x: 0, y: 0 });
  const [coords, setCoords] = React.useState([]);
  const handleContextMenu = ({ position, coords }) => {
    setContextShown(false);
    setCoords(coords);
    setXyPosistion({
      x: position[0],
      y: position[1],
    });
    setContextShown(true);
  };
  const handleHideContextMenu = (_) => {
    setContextShown(false);
    setCoords([]);
  };
  const handleMenuItemClick = (e) => {
    const { value } = e.currentTarget.dataset;
    onMenuItemClicked(value, coords);
    handleHideContextMenu();
  };

  return {
    isContextShown,
    xYPosistion,
    handleContextMenu,
    handleHideContextMenu,
    handleMenuItemClick,
  };
}
