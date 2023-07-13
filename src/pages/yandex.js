import {
  YMaps,
  Map,
  ZoomControl,
  Clusterer,
  Placemark,
} from "@pbe/react-yandex-maps";

import ContextMenu from "Shared/components/ContextMenu";
import OffCanvas from "Shared/components/OffCanvas";

import { useYandexMap } from "Features/yandex/useYandexMap";
import { MARKER_TYPE } from "Shared/constants/common";

export default function YandexMaps() {
  const {
    handleMapClick,
    isContextMenuShown,
    placemarks,
    handleObjectSelected,
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
          {placemarks.map((p, idx) => {
            console.log(p);
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
                  iconContent: idx + 1,
                  hintContent: `<b>${p.title}</b><br /> <span>${p.description}</span>`,
                }}
              />
            );
          })}
        </Clusterer>
        <ZoomControl options={{ float: "right" }} />
      </Map>
      <OffCanvas isShown={isContextMenuShown}>
        <ContextMenu
          onObjectSelected={handleObjectSelected}
        />
      </OffCanvas>
    </YMaps>
  );
}
