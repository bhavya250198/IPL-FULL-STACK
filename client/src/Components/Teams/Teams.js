import axios from "axios";
import React from "react";
import FontAwesome from "react-fontawesome";
import * as ReactBootstrap from "react-bootstrap";
import "../Teams/Teams.scss";
import Kolkata from "../Teams/Images/KKR.JPG";
import Chennai from "../Teams/Images/Chennai.JPG";
import Bangalore from "../Teams/Images/Bangalore.JPG";
import Mumbai from "../Teams/Images/Mumbai.JPG";
import Delhi from "../Teams/Images/Delhi.JPG";
import Hyderabad from "../Teams/Images/Hyderabad.JPG";
import Punjab from "../Teams/Images/Punjab.JPG";
import Rajasthan from "../Teams/Images/Rajasthan.JPG";
import Deccan from "../Teams/Images/Deccan.JPG";
import Gujarat from "../Teams/Images/Gujarat.JPG";
import Rising from "../Teams/Images/Rising.JPG";
import Sahara from "../Teams/Images/PuneWarriors.JPG";
import Kochi from "../Teams/Images/Kochi.JPG";
const back1 = {
  backgroundColor: "white",
};
const back2 = {
  backgroundColor: "white",
};
const back3 = {
  backgroundColor: "white",
};
const back4 = {
  backgroundColor: "white",
};
const back5 = {
  backgroundColor: "white",
};

class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compounds: 20,
      studies: 446,
      crd: 200,
      iit: 400,
      countries: 60,
      planned: 1532,
      firm: 257,
    };
  }

  componentDidMount() {
    // axios.get('http://localhost:4000/compound')
    // .then(response => {
    //     console.log(response);
    //     this.setState({ compounds: response.data.rows[0].count });
    // })
    // .catch(function (error){
    //     console.log(error);
    // });
    // axios.get('http://localhost:4000/study')
    // .then(response => {
    //     console.log(response);
    //     this.setState({ studies: response.data.rows[0].count });
    // })
    // .catch(function (error){
    //     console.log(error);
    // });
    // axios.get('http://localhost:4000/crdiit')
    // .then(response => {
    //     console.log(response);
    //     this.setState({ crd: response.data.rows[0].count,
    //                     iit:response.data.rows[1].count         });
    // })
    // .catch(function (error){
    //     console.log(error);
    // });
    // axios.get('http://localhost:4000/countries')
    // .then(response => {
    //     console.log(response);
    //     this.setState({ countries: response.data.rows[0].count       });
    // })
    // .catch(function (error){
    //     console.log(error);
    // });
    // axios.get('http://localhost:4000/planned')
    // .then(response => {
    //     console.log(response);
    //     this.setState({ planned: response.data.rows[0].sum       });
    // })
    // .catch(function (error){
    //     console.log(error);
    // });
    // axios.get('http://localhost:4000/firm')
    // .then(response => {
    //     console.log(response);
    //     this.setState({ firm: response.data.rows[0].sum       });
    // })
    // .catch(function (error){
    //     console.log(error);
    // });
  }

  render() {
    return (
      <div>
        <span className="teams">Teams</span>
        <ReactBootstrap.CardDeck>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="kolkata" src={Kolkata} alt="KKR" />
              <br />

              <span className="kkr">KKR</span>
              <br />
              {/* <span className="knight" >Knight Riders</span> */}
            </ReactBootstrap.Card.Title>
            {/* <br/> */}
            
          </ReactBootstrap.Card>

          <ReactBootstrap.Card style={back2}>
            <ReactBootstrap.Card.Title>
              <img className="chennai" src={Chennai} alt="KKR" />
              <br />

              <span className="csk">CSK</span>
            </ReactBootstrap.Card.Title>
            
          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back3}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Bangalore} alt="KKR" />
              <br />

              <span className="rcb">RCB</span>
            </ReactBootstrap.Card.Title>
            
          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back4}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Mumbai} alt="KKR" />
              <br />
              <span className="mi">MI</span>
            </ReactBootstrap.Card.Title>
            
          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back5}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Delhi} alt="KKR" />
              <br />
              <span className="dc">DC</span>
            </ReactBootstrap.Card.Title>

          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Hyderabad} alt="KKR" />
              <br />
              <span className="dc">SH</span>
            </ReactBootstrap.Card.Title>


          </ReactBootstrap.Card>
          </ReactBootstrap.CardDeck>
          <ReactBootstrap.CardDeck>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Punjab} alt="KKR" />
              <br />
              <span className="kxip">KXIP</span>
            </ReactBootstrap.Card.Title>

            
          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Rajasthan} alt="KKR" />
              <br />
              <span className="kxip">RR</span>
            </ReactBootstrap.Card.Title>


          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Deccan} alt="KKR" />
              <br />
              <span className="kxip">DC</span>
            </ReactBootstrap.Card.Title>


          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Gujarat} alt="KKR" />
              <br />
              <span className="kxip">GL</span>
            </ReactBootstrap.Card.Title>

           
          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Rising} alt="KKR" />
              <br />
              <span className="kxip">RPS</span>
            </ReactBootstrap.Card.Title>

            
          </ReactBootstrap.Card>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Kochi} alt="KKR" />
              <br />
              <span className="kxip">KTK</span>
            </ReactBootstrap.Card.Title>

           
          </ReactBootstrap.Card>
          </ReactBootstrap.CardDeck>
          <ReactBootstrap.CardDeck>
          <ReactBootstrap.Card style={back1}>
            <ReactBootstrap.Card.Title>
              <img className="bangalore" src={Sahara} alt="KKR" />
              <br />
              <span className="kxip">PWI</span>
            </ReactBootstrap.Card.Title>

            
          </ReactBootstrap.Card>

        </ReactBootstrap.CardDeck>
      </div>
    );
  }
}
export default Cards;
