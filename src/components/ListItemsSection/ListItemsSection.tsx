import React from "react";
import "./ListItemsSection.scss";
import CheckBox from "../CheckBox/CheckBox";

interface Props {
  itemsStyle: string;
  list: {
    description: React.ReactNode;
  }[];
}

const ListItemsSection = (props: Props) => {
  const { list, itemsStyle } = props;

  return (
    <div>
      <ul className={`help-items-container ${itemsStyle}`}>
        {list.map((item, index) => {
          return (
            <li key={index} className="help-item">
              <CheckBox
                isChecked={true}
                id="1"
                onChange={() => {}}
                iconStyle="help-check"
                className="help-label"
              />
              <div className="item">{item.description}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListItemsSection;
