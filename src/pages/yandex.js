import {
  YMaps,
  Map,
  ZoomControl,
  Clusterer,
  Placemark,
  Polyline,
  Polygon,
} from "@pbe/react-yandex-maps";

import { Container, Button, Row, Col } from "react-bootstrap";

import OffCanvas from "Shared/components/OffCanvas";
import RightContext from "Shared/components/RightContext";

import useMapHandler from "Features/yandex/useMapHandler";
import {
  MARKER_IMAGES,
  MAP_DEFAULT_CENTER,
  PLACEMARK_IMAGE_SIZE,
  POLYLINE_DEFAULT_WIDTH,
  MAP_ELEMENT,
} from "Shared/constants/common";
import useContextMenu from "Features/yandex/useContextMenu";
import ElementForm from "Shared/components/ElementForm";

export default function YandexMaps() {
  const {
    lines,
    polygons,
    placemarks,
    selectedElementValue,
    isOffCanvasShown,
    handleMapElementCreation,
    handleMapElementSelect,
    handleOffCanvasClose,
    handleTextFieldChange,
    handleStartDraw,
    handleStopDraw,
  } = useMapHandler();

  const {
    isContextShown,
    xYPosistion,
    handleContextMenu,
    handleHideContextMenu,
    handleMenuItemClick,
  } = useContextMenu({ onMenuItemClicked: handleMapElementCreation });

  return (
    <RightContext
      isContextShown={isContextShown}
      xYPosistion={xYPosistion}
      onHideContextMenu={handleHideContextMenu}
      onMenuItemClicked={handleMenuItemClick}
    >
      <YMaps>
        <Map
          defaultState={{
            center: MAP_DEFAULT_CENTER,
            zoom: 15,
          }}
          width="100%"
          height="100vh"
          modules={["geoObject.addon.editor", "geoObject.addon.hint"]}
          onClick={handleHideContextMenu}
          onContextmenu={(event) => {
            const position = event.get("position");
            const coords = event.get("coords");
            handleContextMenu({ position, coords });
          }}
        >
          <Clusterer
            options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
            }}
          >
            {placemarks.map((p) => {
              return (
                <Placemark
                  key={p.id}
                  geometry={p.coords}
                  options={{
                    iconImageSize: PLACEMARK_IMAGE_SIZE,
                    iconLayout: "default#image",
                    iconImageHref: MARKER_IMAGES[p.markerType],
                  }}
                  properties={{
                    hintContent: `<b>${p.title}</b><br /> <span>${p.description}</span>`,
                  }}
                  onClick={(e) =>
                    handleMapElementSelect(e, p.id, MAP_ELEMENT.PLACEMARK.VALUE)
                  }
                />
              );
            })}
          </Clusterer>
          {lines.map((line) => {
            return (
              <Polyline
                key={line.id}
                geometry={line.coords}
                options={{
                  strokeWidth: POLYLINE_DEFAULT_WIDTH,
                  strokeColor: line.color,
                  editorMaxPoints: Infinity,
                  editorMenuManager: function () {
                    const menuItem = {
                      title: "Завершить редактирование",
                      onClick: handleStopDraw,
                    };
                    return [menuItem];
                  },
                }}
                onClick={(e) =>
                  handleMapElementSelect(e, line.id, MAP_ELEMENT.POLYLINE.VALUE)
                }
                properties={{
                  hintContent: `<b>${line.title}</b><br /> <span>${line.description}</span>`,
                }}
              />
            );
          })}
          {polygons.map((polygon) => {
            return (
              <Polygon
                key={polygon.id}
                geometry={polygon.coords}
                options={{
                  strokeWidth: POLYLINE_DEFAULT_WIDTH,
                  strokeColor: polygon.color,
                  editorMaxPoints: Infinity,
                  editorMenuManager: function () {
                    const menuItem = {
                      title: "Завершить редактирование",
                      onClick: handleStopDraw,
                    };
                    return [menuItem];
                  },
                }}
                onClick={(e) =>
                  handleMapElementSelect(
                    e,
                    polygon.id,
                    MAP_ELEMENT.POLYGON.VALUE
                  )
                }
                properties={{
                  hintContent: `<b>${polygon.title}</b><br /> <span>${polygon.description}</span>`,
                }}
              />
            );
          })}
          <ZoomControl options={{ float: "right" }} />
        </Map>
        <OffCanvas isShown={isOffCanvasShown} onClose={handleOffCanvasClose}>
          {!!selectedElementValue.elementType &&
            !!selectedElementValue.element && (
              <ElementForm
                description={selectedElementValue.element?.description}
                color={selectedElementValue.element?.color}
                title={selectedElementValue.element?.title}
                markerType={selectedElementValue.element?.markerType}
                onTextFieldChange={handleTextFieldChange}
                id={selectedElementValue.element?.id}
                onStartDraw={handleStartDraw}
                elementType={selectedElementValue.elementType}
              />
            )}
        </OffCanvas>
      </YMaps>
    </RightContext>
  );
}
