import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Card} from 'react-bootstrap';


export class Dashboard extends Component{
    
    render(){
        return(
            <div className="container d-flex flex-wrap shadow p-3 mb-5 bg-white rounded mt-4">
                <NavLink className="nav-link d-inline" to="/Filmat">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Filmat</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Filmat.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
                <NavLink className="nav-link d-inline" to="/Seriali">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Serialet</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Serialet.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
                <NavLink className="nav-link d-inline" to="/aktortefilmit">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Aktoret</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Aktoret.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
                <NavLink className="nav-link d-inline" to="kategoritefilmit">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Kategorite</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Kategorite.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
                <NavLink className="nav-link d-inline" to="/producentetefilmit">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Producentet</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Producentet.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
                <NavLink className="nav-link d-inline" to="/regjisoretefilmit">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Regjisoret</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Regjisoret.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
                <NavLink className="nav-link d-inline" to="/skenaristetefilmit">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Skenaristet</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Skenaristet.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
                <NavLink className="nav-link d-inline" to="/rrethnesh">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Reth Nesh</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Rreth Nesh.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
               
                <NavLink className="nav-link d-inline" to="/registersview">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Regjistrimet</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Regjistrimet.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
                <NavLink className="nav-link d-inline" to="/kontakti">
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-primary d-flex justify-content-center">Kontaktet</Card.Title>
                      <Card.Text className="text-center">
                        Klikoni ketu per te menaxhuar Kontaktet.
                      </Card.Text>
                  </Card.Body>
                </Card>
                </NavLink>
            </div>
        )
    }
}