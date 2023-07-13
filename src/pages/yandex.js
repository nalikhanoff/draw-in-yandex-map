import { YMaps, Map } from "@pbe/react-yandex-maps";

export default function YandexMaps() {
  return (
    <YMaps>
      <div>My awesome application with maps!</div>
      <Map
        defaultState={{
          center: [55.75, 37.57],
          zoom: 9,
          controls: ["zoomControl"],
        }}
        modules={["control.ZoomControl"]}
      />
    </YMaps>
  );
}
