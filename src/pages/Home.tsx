import { Card } from "react-bootstrap";
import AddressTable from "../components/address/AddressTable";

const Home = () => {
  return (
    <section>
    
      <Card>
      <h2 className="text-center">Travel Route Guide</h2>
        <Card.Header>Your Addresses</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <AddressTable />
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Home;
