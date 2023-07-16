import { v4 as uuid } from "uuid";
import { useState, useRef } from "react";
import { MARKER_TYPE } from "Shared/constants/common";

export function useYandexMap() {
  const [isContextMenuShown, setIsContextMenuShown] = useState(false);
  const [placemarks, setPlacemarks] = useState([]);
  const [lines, setLines] = useState([]);

  const { current: handleMapClick } = useRef((e) => {
    const coords = e.get("coords");

    setPlacemarks((prevState) => {
      return [
        ...prevState,
        {
          id: uuid(),
          title: "unknown place",
          description: "unknown place description",
          markerType: MARKER_TYPE.DEFAULT,
          coords,
        },
      ];
    });

    setIsContextMenuShown(true);
  });

  const { current: draw } = useRef(({ originalEvent: { target } }, id) => {
    target.editor.startEditing();

    target.editor.events.add(["vertexadd", "vertexdragend"], (ev) => {
      target.editor.stopEditing();
      setLines((prevState) => {
        const newState = [...prevState];
        const el = newState.find((line) => line.id === id);
        el.coords = ev.originalEvent.target.geometry.getCoordinates();
        return newState;
      });
    });
  });

  const { current: handleObjectSelected } = useRef(() => {
    setIsContextMenuShown(false);
  });

  const { current: handleRoadSelected } = useRef(() => {
    let coords;
    setPlacemarks((prevValue) => {
      coords = prevValue.at(-1).coords;
      return prevValue.slice(0, -1);
    });

    setLines((prevState) => {
      return [
        ...prevState,
        {
          id: uuid(),
          title: "unknown road",
          description: "unknown road description",
          coords: [coords, coords.map((c) => c + 0.1)],
          color: "#F008",
        },
      ];
    });

    setIsContextMenuShown(false);
  });

  const { current: handleContextMenuClose } = useRef(() => {
    setPlacemarks((prevValue) => prevValue.slice(0, -1));
    setIsContextMenuShown(false);
  });

  return {
    handleMapClick,
    draw,
    lines,
    placemarks,
    isContextMenuShown,
    handleObjectSelected,
    handleRoadSelected,
    handleContextMenuClose,
  };
}
