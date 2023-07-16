import { v4 as uuid } from "uuid";
import { useState, useRef, useMemo } from "react";
import { MARKER_TYPE } from "Shared/constants/common";

export default function useMapHandler() {
  const [isContextMenuShown, setIsContextMenuShown] = useState(false);
  const [isMarkerFormShown, setIsMarkerFormShown] = useState(false);
  const [placemarks, setPlacemarks] = useState([]);
  const [selectedPlacemarkId, setSelectedPlacemarkId] = useState(null);
  const [lines, setLines] = useState([]);

  const selectedPlacemark = useMemo(() => {
    if (!selectedPlacemarkId || !placemarks.length) return null;
    return placemarks.find((p) => p.id === selectedPlacemarkId);
  }, [selectedPlacemarkId, placemarks]);

  const { current: handleMapClick } = useRef((e) => {
    const coords = e.get("coords");

    setPlacemarks((prevState) => {
      return [
        ...prevState,
        {
          id: uuid(),
          title: "unknown place",
          description: "unknown place description",
          markerType: MARKER_TYPE.DEFAULT.VALUE,
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

  const { current: handleMarkerFormClose } = useRef(() => {
    setIsMarkerFormShown(false);
  });

  const { current: handlePlacemarkSelect } = useRef((id) => {
    setSelectedPlacemarkId(id);
    setIsMarkerFormShown(true);
  });

  const { current: handleMarkerFieldChange } = useRef((e) => {
    const { id, name, value } = e.target;

    setPlacemarks((prevState) => {
      const newState = [...prevState];
      const placemarkToChange = newState.find((p) => p.id === id);
      placemarkToChange[name] = value;
      return newState;
    });
  });

  return {
    handleMapClick,
    draw,
    lines,
    placemarks,
    isContextMenuShown,
    isMarkerFormShown,
    selectedPlacemark,
    handleObjectSelected,
    handleRoadSelected,
    handleContextMenuClose,
    handleMarkerFieldChange,
    handlePlacemarkSelect,
    handleMarkerFormClose,
  };
}
