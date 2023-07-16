import {
  YMaps,
  Map,
  ZoomControl,
  Clusterer,
  Placemark,
  Polyline,
} from "@pbe/react-yandex-maps";

import ContextMenu from "Shared/components/ContextMenu";

import { useYandexMap } from "Features/yandex/useYandexMap";
import { MARKER_TYPE } from "Shared/constants/common";

export default function YandexMaps() {
  const {
    handleMapClick,
    isContextMenuShown,
    placemarks,
    lines,
    draw,
    handleRoadSelected,
    handleObjectSelected,
    handleContextMenuClose,
  } = useYandexMap();
  return (
    <YMaps>
      <Map
        defaultState={{
          center: [51.08, 71.26],
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
                  iconLayout: "default#image",
                  iconImageSize: [30, 30],
                  ...(p.markerType !== MARKER_TYPE.DEFAULT && {
                    iconImageHref:
                      "https://img.icons8.com/ios-filled/2x/marker-h.png",
                  }),
                }}
                properties={{
                  hintContent: `<b>${p.title}</b><br /> <span>${p.description}</span>`,
                }}
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
                strokeWidth: 10,
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
    </YMaps>
  );
}
