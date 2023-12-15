import React from "react";
import { Spinner } from "react-bootstrap";

// Define the shape of the Props for the Loader component
interface Props {
  children?: any; // Optional children prop
}

// Loader component definition
const Loader = (props: Props) => {
  return (
    // Container for the loader, centered and with some margin
    <div className="row my-5 text-center">
      {/* Render the children passed to the Loader component */}
      <div className="col-md-12">{props.children}</div>

      {/* Loader component, centered with some offset */}
      <div className="mt-4 offset-sm-5 col-sm-2">
        {/* Use the Spinner component from react-bootstrap with border animation */}
        <Spinner animation="border" />
      </div>
    </div>
  );
};

// Export the Loader component as the default export
export default Loader;
