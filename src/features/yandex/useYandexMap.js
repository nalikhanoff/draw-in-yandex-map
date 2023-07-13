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

  const draw = useRef(({ originalEvent: { target } }) => {
    target.editor.startEditing();

    target.editor.events.add("vertexadd", (event) => {
      target.editor.stopEditing();
    });
  });

  const { current: handleObjectSelected } = useRef(() => {
    setIsContextMenuShown(false);
  });

  return {
    handleMapClick,
    draw,
    placemarks,
    isContextMenuShown,
    handleObjectSelected,
  };
}
