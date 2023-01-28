import React from "react";
import "./ResultsList.css";

/**
 * <ResultsList
 *   items={[...]}
 *   onSelect={item => console.log(item.name)}
 *   className="MyResultsList"
 * />
 *
 * @prop {Array} items List of results of form { name: string, state: { abbreviation: string } }
 * @prop {Function} onSelect Callback to execute when item is selected, accepts object.
 * @prop {mixed} ... All other props will be forwarded to the container DOM node.
 */
function ResultsList(props) {
  return (
    <div
      className="delete-icon"
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  )
}

export default ResultsList;