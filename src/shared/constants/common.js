export const GEO_OBJECT = {
  PLACEMARK: {
    LABEL: "Устройство",
    VALUE: "PLACEMARK",
  },
  POLYLINE: {
    LABEL: "Линия",
    VALUE: "POLYLINE",
  },
  POLYGON: {
    LABEL: "Многогранник",
    VALUE: "POLYGON",
  },
};

export const MARKER_TYPE = {
  USER: {
    LABEL: "Абонент",
    VALUE: "USER",
  },
  DEFAULT: {
    LABEL: "Муфта",
    VALUE: "DEFAULT",
  },
  SERVER: {
    LABEL: "Сервер",
    VALUE: "SERVER",
  },
};

export const MARKER_IMAGES = {
  [MARKER_TYPE.SERVER.VALUE]:
    "https://www.freepnglogos.com/uploads/server-png/server-icon-line-iconset-iconsmind-11.png",
  [MARKER_TYPE.DEFAULT.VALUE]:
    "https://www.freeiconspng.com/uploads/wired-network-icon-12.png",
  [MARKER_TYPE.USER.VALUE]:
    "https://www.freepnglogos.com/uploads/notebook-png/notebook-laptop-hand-illustration-transparent-png-svg-30.png",
};

export const LINE_COLOR = {
  DEFAULT: {
    LABEL: "Красный",
    VALUE: "#F008",
  },
  BLUE: {
    LABEL: "Синий",
    VALUE: "#256bdb",
  },
  YELLOW: {
    LABEL: "Желтый",
    VALUE: "#d9931a",
  },
  BROWN: {
    LABEL: "Коричневый",
    VALUE: "#52220c",
  },
};

export const OFFCANVAS_MODE = {
  CONTEXT_MENU: "CONTEXT_MENU",
  MARKER_FORM: "MARKER_FORM",
  LINE_FORM: "LINE_FORM",
};

export const MAP_DEFAULT_CENTER = [51.123164, 71.432849];
export const PLACEMARK_IMAGE_SIZE = [30, 30];
export const POLYLINE_DEFAULT_WIDTH = 5;

export const GEO_OBJECT_COLLECTION = Object.values(GEO_OBJECT);
export const MARKER_TYPE_COLLECTION = Object.values(MARKER_TYPE);
export const LINE_COLOR_COLLECTION = Object.values(LINE_COLOR);
