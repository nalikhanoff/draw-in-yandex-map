import { v4 as uuid } from "uuid";
import { useState, useRef, useMemo, useCallback } from "react";
import { MARKER_TYPE, OFFCANVAS_MODE } from "Shared/constants/common";

export default function useMapHandler() {
  const [isOffCanvasShown, setOffCanvasShown] = useState(false);
  const [offCanvasMode, setOffCanvasMode] = useState(null);
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
          title: "Устройство без названия",
          description: "Описание устройства без названия",
          markerType: MARKER_TYPE.DEFAULT.VALUE,
          coords,
        },
      ];
    });

    setOffCanvasShown(true);
    setOffCanvasMode(OFFCANVAS_MODE.CONTEXT_MENU);
    
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
    setOffCanvasShown(false);
    setOffCanvasMode(null);
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
          title: "Линия без названия",
          description: "Описание линии без названия",
          coords: [coords, coords.map((c) => c + 0.1)],
          color: "#F008",
        },
      ];
    });

    setOffCanvasShown(false);
    setOffCanvasMode(null);
  });

  const handleOffCanvasClose = useCallback(() => {
    if (offCanvasMode === OFFCANVAS_MODE.CONTEXT_MENU) {
      setPlacemarks((prevValue) => prevValue.slice(0, -1));
    }
    setOffCanvasShown(false);
    setOffCanvasMode(null);
  }, [offCanvasMode]);

  const { current: handlePlacemarkSelect } = useRef((id) => {
    setSelectedPlacemarkId(id);
    setOffCanvasShown(true);
    setOffCanvasMode(OFFCANVAS_MODE.MARKER_FORM);
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
    isOffCanvasShown,
    offCanvasMode,
    selectedPlacemark,
    handleObjectSelected,
    handleRoadSelected,
    handleOffCanvasClose,
    handleMarkerFieldChange,
    handlePlacemarkSelect,
  };
}
