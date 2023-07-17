import {
  YMaps,
  Map,
  ZoomControl,
  Clusterer,
  Placemark,
  Polyline,
} from "@pbe/react-yandex-maps";

import OffCanvas from "Shared/components/OffCanvas";
import ContextMenu from "Shared/components/ContextMenu";
import MarkerForm from "Shared/components/MarkerForm";

import useMapHandler from "Features/yandex/useMapHandler";
import {
  MARKER_TYPE,
  MAP_DEFAULT_CENTER,
  PLACEMARK_IMAGE_SIZE,
  POLYLINE_DEFAULT_WIDTH,
  OFFCANVAS_MODE,
} from "Shared/constants/common";

import network from '../../public/network.png';

export default function YandexMaps() {
  const {
    lines,
    placemarks,
    selectedPlacemark,
    isOffCanvasShown,
    offCanvasMode,
    draw,
    handleMapClick,
    handleRoadSelected,
    handleObjectSelected,
    handleOffCanvasClose,
    handlePlacemarkSelect,
    handleMarkerFieldChange,
  } = useMapHandler();
  console.log(network);
  return (
    <YMaps>
      <Map
        defaultState={{
          center: MAP_DEFAULT_CENTER,
          zoom: 9,
        }}
        width="100%"
        height="100vh"
        modules={["geoObject.addon.editor", "geoObject.addon.hint"]}
        onClick={handleMapClick}
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
                  ...(p.markerType !== MARKER_TYPE.DEFAULT.VALUE
                    ? {
                        iconLayout: "default#image",
                        iconImageHref: network.src,
                      }
                    : { preset: "islands#blueCircleDotIcon" }),
                }}
                properties={{
                  hintContent: `<b>${p.title}</b><br /> <span>${p.description}</span>`,
                }}
                onClick={() => handlePlacemarkSelect(p.id)}
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
              }}
              onClick={(e) => draw(e, line.id)}
              properties={{
                hintContent: `<b>${line.title}</b><br /> <span>${line.description}</span>`,
              }}
            />
          );
        })}
        <ZoomControl options={{ float: "right" }} />
      </Map>
      <OffCanvas isShown={isOffCanvasShown} onClose={handleOffCanvasClose}>
        {offCanvasMode === OFFCANVAS_MODE.CONTEXT_MENU && (
          <ContextMenu
            onObjectSelected={handleObjectSelected}
            onRoadSelected={handleRoadSelected}
          />
        )}
        {offCanvasMode === OFFCANVAS_MODE.MARKER_FORM && (
          <MarkerForm
            description={selectedPlacemark?.description}
            markerType={selectedPlacemark?.markerType}
            title={selectedPlacemark?.title}
            onTextFieldChange={handleMarkerFieldChange}
            id={selectedPlacemark?.id}
          />
        )}
      </OffCanvas>
    </YMaps>
  );
}
