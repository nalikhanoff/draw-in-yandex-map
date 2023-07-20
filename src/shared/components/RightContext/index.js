import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { GEO_OBJECT_COLLECTION } from "Shared/constants/common";

function RightContext({
  onMenuItemClicked,
  children,
  xYPosistion,
  isContextShown,
}) {
  return (
    <ListGroup as="div">
      {children}
      {isContextShown && (
        <div
          style={{ top: xYPosistion.y, left: xYPosistion.x }}
          className="rightClick"
        >
          {GEO_OBJECT_COLLECTION.map((geoObj) => {
            return (
              <ListGroup.Item
                action
                onClick={onMenuItemClicked}
                key={geoObj.VALUE}
                data-value={geoObj.VALUE}
              >
                {geoObj.LABEL}
              </ListGroup.Item>
            );
          })}
        </div>
      )}
    </ListGroup>
  );
}
export default RightContext;
