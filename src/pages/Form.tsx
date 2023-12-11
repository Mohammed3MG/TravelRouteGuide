import { Card } from "react-bootstrap";
import MapWrapper from "../components/map/Wrapper";
import AddressTable from "../components/address/AddressTable";
import brandenburg_gate from "../assets/img/gate.jpg"; 
import bc from "../assets/img/bc.jpeg"; 
import alex from "../assets/img/alexander.webp"; 
import charlot from "../assets/img/charlot.webp"; 


const Form = () => {
  return (
    <section>
      <h2 className="text-center">Choose your addresses</h2>
      <Card>
        <Card.Header>Pick your addresses</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <p>
                Use the search box or browse in the map, then click your
                location to save it.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <MapWrapper />
            </div>
            <div className="col-md-6">
              <AddressTable mapPage={true} />
            </div>

            <div className="col-md-6">
              <h4>Places to visit in Berlin</h4>

              <div className="row">
              <div className="col-md-6">
              <Card>
              <Card.Img variant="top" src={brandenburg_gate} />
              <Card.Body>
              <Card.Title>Brandenburg Gate</Card.Title>
              <Card.Text style={{textAlign: 'justify', fontSize:12}}>
              is Berlin's signature attraction. Built in 1791, it was just one of many old city gates around the city of Berlin which, at that time, was still a manageable size.
              </Card.Text>
              </Card.Body>
              </Card>
              </div>

              <div className="col-md-6">
              <Card>
              <Card.Img variant="top" src={bc} />
              <Card.Body>
              <Card.Title>Berlin Cathedral</Card.Title>
              <Card.Text style={{textAlign: 'justify', fontSize:12}}>
              It was built at the start of the 20th century as a way to express the imperial power of Germany. The brick, neo-Renaissance cathedral is located in Museum Island.
              </Card.Text>
              </Card.Body>
              </Card>
                </div>
                

              <div className="col-md-6">
              <Card style={{'marginTop': '15px' }}>
              <Card.Img variant="top" src={alex} />
              <Card.Body>
              <Card.Title>Alexanderplatz</Card.Title>
              <Card.Text style={{textAlign: 'justify', fontSize:12}}>
              This large public square is right in the heart of the Mitte district, and it is the major hub for transport in Berlin. Today, it is also home to some of the most popular historic attractions in the city.
              </Card.Text>
              </Card.Body>
              </Card>
                </div>
                
                <div className="col-md-6">
              <Card style={{'marginTop': '15px' }}>
              <Card.Img variant="top" src={charlot} />
              <Card.Body>
              <Card.Title>Charlottenburg Palace</Card.Title>
              <Card.Text style={{textAlign: 'justify', fontSize:12}}>
              The beautiful palace hosts fine collections of china and paintings and is situated in the middle of a picturesque palace garden right next to the river Spree.
              </Card.Text>
              </Card.Body>
              </Card>
              </div>
          
            </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Form;
