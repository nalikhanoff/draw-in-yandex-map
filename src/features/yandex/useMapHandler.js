import { v4 as uuid } from "uuid";
import { useState, useRef, useMemo, useCallback } from "react";
import { MARKER_TYPE, LINE_COLOR, MAP_ELEMENT } from "Shared/constants/common";

export default function useMapHandler() {
  const [isOffCanvasShown, setOffCanvasShown] = useState(false);
  const [offCanvasMode, setOffCanvasMode] = useState(null);
  const [placemarks, setPlacemarks] = useState([]);
  const [lines, setLines] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [selectedElement, setSelectedElement] = useState({
    id: null,
    elementType: null,
  });
  const [targetEvent, setTargetEvent] = useState();

  const selectedElementValue = useMemo(() => {
    if (!selectedElement.id || !selectedElement.elementType) {
      return { element: null, elementType: null };
    }

    if (selectedElement.elementType === MAP_ELEMENT.PLACEMARK.VALUE) {
      return {
        element: placemarks.find((p) => p.id === selectedElement.id),
        elementType: selectedElement.elementType,
      };
    } else if (selectedElement.elementType === MAP_ELEMENT.POLYLINE.VALUE) {
      return {
        element: lines.find((l) => l.id === selectedElement.id),
        elementType: selectedElement.elementType,
      };
    } else if (selectedElement.elementType === MAP_ELEMENT.POLYGON.VALUE) {
      return {
        element: polygons.find((p) => p.id === selectedElement.id),
        elementType: selectedElement.elementType,
      };
    }
  }, [selectedElement, placemarks, lines, polygons]);

  const { current: handleMapElementCreation } = useRef(
    (elementType, coords) => {
      if (elementType === MAP_ELEMENT.PLACEMARK.VALUE) {
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
      } else if (elementType === MAP_ELEMENT.POLYLINE.VALUE) {
        setLines((prevState) => {
          return [
            ...prevState,
            {
              id: uuid(),
              title: "Линия без названия",
              description: "Описание линии без названия",
              coords: [coords, coords.map((c) => c + 0.01)],
              color: LINE_COLOR.DEFAULT.VALUE,
            },
          ];
        });
      } else if (elementType === MAP_ELEMENT.POLYGON.VALUE) {
        setPolygons((prevState) => {
          return [
            ...prevState,
            {
              id: uuid(),
              title: "Без названия",
              description: "Описание без названия",
              coords: [[coords, coords.map((c) => c + 0.01)]],
              color: LINE_COLOR.DEFAULT.VALUE,
            },
          ];
        });
      }
    }
  );

  const { current: handleMapElementSelect } = useRef((e, id, elementType) => {
    setSelectedElement({ id, elementType });

    if (elementType !== MAP_ELEMENT.PLACEMARK.VALUE) {
      const { target } = e.originalEvent;
      setTargetEvent(target);
    }
    setOffCanvasShown(true);
  });

  const handleStartDraw = useCallback(() => {
    if (!targetEvent) return;

    setOffCanvasShown(false);
    setOffCanvasMode(null);
    targetEvent.editor.startEditing();
    targetEvent.editor.events.add(["vertexadd", "vertexdragend"], (ev) => {
      if (selectedElement.elementType === MAP_ELEMENT.POLYLINE.VALUE) {
        setLines((prevState) => {
          const newState = [...prevState];
          const el = newState.find((line) => line.id === selectedElement.id);
          el.coords = ev.originalEvent.target.geometry.getCoordinates();
          return newState;
        });
      } else if (selectedElement.elementType === MAP_ELEMENT.POLYGON.VALUE) {
        setPolygons((prevState) => {
          const newState = [...prevState];
          const el = newState.find((line) => line.id === selectedElement.id);
          el.coords = ev.originalEvent.target.geometry.getCoordinates();
          return newState;
        });
      }
    });
  }, [targetEvent, selectedElement]);

  const handleStopDraw = useCallback(() => {
    if (!targetEvent) return;
    targetEvent.editor.stopEditing();

    setTargetEvent(null);
  }, [targetEvent]);

  const handleOffCanvasClose = useCallback(() => {
    setOffCanvasShown(false);
    setOffCanvasMode(null);
    setTargetEvent(null);
  }, [offCanvasMode]);

  const { current: handleTextFieldChange } = useRef((e) => {
    const { id, name, value } = e.target;
    const { elementType } = e.currentTarget.dataset;

    if (elementType === MAP_ELEMENT.PLACEMARK.VALUE) {
      setPlacemarks((prevState) => {
        const newState = [...prevState];
        const placemarkToChange = newState.find((p) => p.id === id);
        placemarkToChange[name] = value;
        return newState;
      });
    } else if (elementType === MAP_ELEMENT.POLYLINE.VALUE) {
      setLines((prevState) => {
        const newState = [...prevState];
        const lineToChange = newState.find((p) => p.id === id);
        lineToChange[name] = value;
        return newState;
      });
    } else if (elementType === MAP_ELEMENT.POLYGON.VALUE) {
      setPolygons((prevState) => {
        const newState = [...prevState];
        const lineToChange = newState.find((p) => p.id === id);
        lineToChange[name] = value;
        return newState;
      });
    }
  });

  return {
    lines,
    placemarks,
    polygons,
    isOffCanvasShown,
    selectedElementValue,
    handleMapElementCreation,
    handleMapElementSelect,
    handleOffCanvasClose,
    handleTextFieldChange,
    handleStartDraw,
    handleStopDraw,
  };
}
