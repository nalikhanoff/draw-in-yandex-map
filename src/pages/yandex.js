import {
  YMaps,
  Map,
  ZoomControl,
  Clusterer,
  Placemark,
  Polyline,
} from "@pbe/react-yandex-maps";

import ContextMenu from "Shared/components/ContextMenu";

import useMapHandler from "Features/yandex/useMapHandler";
import {
  MARKER_TYPE,
  MAP_DEFAULT_CENTER,
  PLACEMARK_IMAGE_SIZE,
  POLYLINE_DEFAULT_WIDTH,
} from "Shared/constants/common";
import MarkerForm from "Shared/components/MarkerForm";

export default function YandexMaps() {
  const {
    lines,
    placemarks,
    selectedPlacemark,
    isContextMenuShown,
    isMarkerFormShown,
    draw,
    handleMapClick,
    handleRoadSelected,
    handleObjectSelected,
    handleContextMenuClose,
    handlePlacemarkSelect,
    handleMarkerFieldChange,
    handleMarkerFormClose,
  } = useMapHandler();
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
                        iconImageHref:
                          "https://img.icons8.com/ios-filled/2x/marker-i.png",
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
      <ContextMenu
        isShown={isContextMenuShown}
        onClose={handleContextMenuClose}
        onObjectSelected={handleObjectSelected}
        onRoadSelected={handleRoadSelected}
      />
      <MarkerForm
        isShown={isMarkerFormShown}
        title={selectedPlacemark?.title}
        description={selectedPlacemark?.description}
        markerType={selectedPlacemark?.markerType}
        onClose={handleMarkerFormClose}
        onTextFieldChange={handleMarkerFieldChange}
        id={selectedPlacemark?.id}
      />
    </YMaps>
  );
}
