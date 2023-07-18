import { v4 as uuid } from "uuid";
import { useState, useRef, useMemo, useCallback } from "react";
import {
  MARKER_TYPE,
  OFFCANVAS_MODE,
  LINE_COLOR,
  GEO_OBJECT,
} from "Shared/constants/common";

export default function useMapHandler() {
  const [isOffCanvasShown, setOffCanvasShown] = useState(false);
  const [offCanvasMode, setOffCanvasMode] = useState(null);
  const [placemarks, setPlacemarks] = useState([]);
  const [lines, setLines] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [selectedPlacemarkId, setSelectedPlacemarkId] = useState(null);
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [targetLineEvent, setTargetLineEvent] = useState();

  const selectedPlacemark = useMemo(() => {
    if (!selectedPlacemarkId || !placemarks.length) return null;
    return placemarks.find((p) => p.id === selectedPlacemarkId);
  }, [selectedPlacemarkId, placemarks]);

  const selectedLine = useMemo(() => {
    if (!selectedLineId || !lines.length) return null;
    return lines.find((p) => p.id === selectedLineId);
  }, [selectedLineId, lines]);

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

  const { current: handleLineSelect } = useRef(
    ({ originalEvent: { target } }, id) => {
      setTargetLineEvent(target);

      setSelectedLineId(id);
      setOffCanvasShown(true);
      setOffCanvasMode(OFFCANVAS_MODE.LINE_FORM);
    }
  );

  const handleStartDraw = useCallback(() => {
    if (!targetLineEvent) return;

    setOffCanvasShown(false);
    setOffCanvasMode(null);
    targetLineEvent.editor.startEditing();
    targetLineEvent.editor.events.add(["vertexadd", "vertexdragend"], (ev) => {
      setLines((prevState) => {
        const newState = [...prevState];
        const el = newState.find((line) => line.id === selectedLineId);
        el.coords = ev.originalEvent.target.geometry.getCoordinates();
        return newState;
      });
    });
  }, [targetLineEvent, selectedLineId]);

  const handleStopDraw = useCallback(() => {
    if (!targetLineEvent) return;
    targetLineEvent.editor.stopEditing();

    setTargetLineEvent(null);
  }, [targetLineEvent]);

  const { current: handleObjectSelected } = useRef((e) => {
    const { value } = e.currentTarget.dataset;

    if (value !== GEO_OBJECT.PLACEMARK.VALUE) {
      let coords;
      setPlacemarks((prevValue) => {
        coords = prevValue.at(-1).coords;
        return prevValue.slice(0, -1);
      });

      if (value === GEO_OBJECT.POLYLINE.VALUE) {
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

      } else if (value === GEO_OBJECT.POLYGON.VALUE) {
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
    setOffCanvasShown(false);
    setOffCanvasMode(null);
  });

  const handleOffCanvasClose = useCallback(() => {
    if (offCanvasMode === OFFCANVAS_MODE.CONTEXT_MENU) {
      setPlacemarks((prevValue) => prevValue.slice(0, -1));
    }
    setOffCanvasShown(false);
    setOffCanvasMode(null);
    setTargetLineEvent(null);
  }, [offCanvasMode]);

  const { current: handlePlacemarkSelect } = useRef((id) => {
    setSelectedPlacemarkId(id);
    setOffCanvasShown(true);
    setOffCanvasMode(OFFCANVAS_MODE.MARKER_FORM);
  });

  const handleStartDrawPolygon = useCallback((e, id) => {
    setOffCanvasShown(false);
    setOffCanvasMode(null);
    e.originalEvent.target.editor.startEditing();
    e.originalEvent.target.editor.events.add(
      ["vertexadd", "vertexdragend"],
      (ev) => {
        setPolygons((prevState) => {
          const newState = [...prevState];
          const el = newState.find((line) => line.id === id);
          el.coords = ev.originalEvent.target.geometry.getCoordinates();
          return newState;
        });
        e.originalEvent.target.editor.stopEditing();
      }
    );
  }, []);

  const { current: handleMarkerFieldChange } = useRef((e) => {
    const { id, name, value } = e.target;

    setPlacemarks((prevState) => {
      const newState = [...prevState];
      const placemarkToChange = newState.find((p) => p.id === id);
      placemarkToChange[name] = value;
      return newState;
    });
  });

  const { current: handleLineFieldChange } = useRef((e) => {
    const { id, name, value } = e.target;

    setLines((prevState) => {
      const newState = [...prevState];
      const lineToChange = newState.find((p) => p.id === id);
      lineToChange[name] = value;
      return newState;
    });
  });

  return {
    handleMapClick,
    lines,
    placemarks,
    polygons,
    isOffCanvasShown,
    offCanvasMode,
    selectedLine,
    selectedPlacemark,
    handleObjectSelected,
    handleOffCanvasClose,
    handleMarkerFieldChange,
    handlePlacemarkSelect,
    handleLineSelect,
    handleLineFieldChange,
    isDrawing: !!targetLineEvent,
    handleStartDraw,
    handleStopDraw,
    handleStartDrawPolygon,
  };
}
