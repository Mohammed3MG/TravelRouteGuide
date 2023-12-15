import { Fragment } from "react";
import { Table } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import Addresses from "./Addresses";
import Empty from "./Empty";
import Header from "./Header";
import classes from "./AddressTable.module.scss";
import Ready from "./Ready";

// Define the shape of the Props for the AddressTable component
interface Props {
  mapPage?: boolean;      // Flag to indicate if the component is used on the map page
  resultPage?: boolean;   // Flag to indicate if the component is used on the result page
}

// AddressTable component definition
const AddressTable = (props: Props) => {
  // GET ADDRESS STATE
  const addressState = useAppSelector((state) => state.address);

  // Determine if there are addresses and if there are at least 2
  const hasAddresses = addressState.count > 0;
  const hasMinimumAddresses = addressState.count >= 2;

  // Set the resultPage flag based on props or default to false
  const resultPage = props.resultPage || false;

  return (
    // Fragment to group multiple components without introducing a new parent element
    <Fragment>
      {/* Display Empty component if there are no or less than 2 addresses */}
      {!hasMinimumAddresses && (
        <Empty count={addressState.count} mapPage={props.mapPage} />
      )}

      {/* Display Ready component if there are at least 2 addresses and not on the result page */}
      {hasMinimumAddresses && !resultPage && (
        <Ready count={addressState.count} />
      )}

      {/* Container for the table with custom styling */}
      <div className={classes.tableContainer}>
        {/* Table to display addresses */}
        <Table striped bordered hover responsive size="sm">
          {/* Display the Header component with optional mapPage flag */}
          <Header mapPage={props.mapPage || false} />

          {/* Table body */}
          <tbody>
            {/* Display a message if there are no addresses */}
            {!hasAddresses && (
              <tr>
                <td colSpan={20} className="text-center">
                  You don't have any addresses chosen.
                </td>
              </tr>
            )}

            {/* Display the Addresses component with optional mapPage flag */}
            <Addresses mapPage={props.mapPage || false} />
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

// Export the AddressTable component as the default export
export default AddressTable;
