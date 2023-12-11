import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Cities = () => {
  return (
    <section>
      <h2 className="text-center">List of Cities</h2>
      <Card>
        <Card.Header>Pick your destination city</Card.Header>
        <Card.Body>
          <div className="row">
            
            <div className="col-md-6 mb-3">
              <img src='https://cdn.getyourguide.com/img/location/6f156967bc6d6563.jpeg/99.jpg'
                className='img-fluid shadow-4 img-thumbnail' alt='Berlin' style={{ height: 420, width: 600 }} />
              <h3 className="img-caption"> 
                <Link to="/berlin" style={{ textDecoration: 'none' }}>Berlin</Link>
              <img src='https://m.media-amazon.com/images/I/615RxdgDj3L._AC_SX425_.jpg'
                className='img-fluid ' alt='Flag' style={{ height: 45, width: 70, marginLeft: 10 }} />
              </h3>
            </div>
            <div className="col-md-6">
            <img src='https://static.barcelo.com/content/dam/bpt/posts/2017/11/things-to-do-in-hamburg-st-pauli.jpg'
                className='img-fluid shadow-4 img-thumbnail' alt='Hamburg' style={{ height: 420, width: 600 }} />
              <h3 className="img-caption">
              <Link to="/hamburg" style={{ textDecoration: 'none' }}>Hamburg</Link>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_Hamburg.svg/1200px-Flag_of_Hamburg.svg.png'
                  className='img-fluid ' alt='Flag' style={{ height: 45, width: 70, marginLeft: 10 }} />
              </h3>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Cities;
