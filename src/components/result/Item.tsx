import IDistance from "../../types/IDistance";
import classes from "./Item.module.scss";

// Define the properties expected by the Item component
interface Props {
  distance: IDistance; // Distance information, including origin and destination addresses and distance value
  index: number; // Index of the item in the list
  lastIndex: number; // Index of the last item in the list
}

// Functional component representing an individual item in a distance list
const Item = (props: Props) => {
  let rowClass = "";

  // Set the CSS class based on the item's index
  if (props.index === 0) rowClass = classes.green; // Use green class for the first item
  if (props.index === props.lastIndex) rowClass = classes.red; // Use red class for the last item

  return (
    // Render a table row with relevant information
    <tr className={rowClass}>
      <td className="text-center">{props.index + 1}</td> {/* Display the item index */}
      <td>{props.distance.origin.address}</td> {/* Display the origin address */}
      <td>{props.distance.destination.address}</td> {/* Display the destination address */}
      <td>{`${props.distance.distance.toFixed(2)} Km`}</td> {/* Display the distance value */}
    </tr>
  );
};

// Export the Item component as the default export
export default Item;
