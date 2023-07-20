import React from "react";

export default function useContextMenu() {
  const [isContextShown, setContextShown] = React.useState(false);
  const [xYPosistion, setXyPosistion] = React.useState({ x: 0, y: 0 });
  const handleContextMenu = (event) => {
    setContextShown(false);
    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setXyPosistion(positionChange);
    setContextShown(true);
  };
  const handleHideContextMenu = (_) => {
    setContextShown(false);
  };
  const onMenuItemClicked = (e) => {
    const { value } = e.currentTarget.dataset;
    console.log(value, 'I am the value of menu item')
    handleHideContextMenu();
  };

  return {
    isContextShown,
    xYPosistion,
    handleContextMenu,
    handleHideContextMenu,
    onMenuItemClicked,
  };
}
