import { Fragment } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

// Define the shape of the Props for the Empty component
interface Props {
  count: number;         // Number of chosen addresses
  mapPage?: boolean;     // Flag to indicate if the component is used on the map page
}

// Empty component definition
const Empty = (props: Props) => {
  return (
    // Display a warning alert with a centered text
    <Alert variant="warning" className="text-center">
      {/* Display the count of chosen addresses */}
      <span>You have chosen {props.count} address(es). </span>

      {/* Conditionally display additional message based on the mapPage prop */}
      {props.mapPage ? (
        // Display a simple message for the map page
        "Please choose at least 2 to see results."
      ) : (
        // Display a more detailed message with a Link to the form page
        <Fragment>
          Click <Link to="/form#searchBox" className="btn btn-primary">Me</Link> to choose at least 2 to
          see results.
        </Fragment>
      )}
    </Alert>
  );
};

// Export the Empty component as the default export
export default Empty;
