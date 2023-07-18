import ListGroup from "react-bootstrap/ListGroup";

import { GET_OBJECT_COLLECTION } from "Shared/constants/common";

export default function ContextMenu({ onObjectSelected }) {
  return (
    <ListGroup>
      {GET_OBJECT_COLLECTION.map((geoObject) => {
        return (
          <ListGroup.Item
            action
            onClick={onObjectSelected}
            data-value={geoObject.VALUE}
            key={geoObject.VALUE}
          >
            {geoObject.LABEL}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
