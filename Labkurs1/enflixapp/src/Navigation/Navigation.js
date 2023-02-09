import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';




export class Navigation extends Component{
 
    render(){
        function logout(){
            localStorage.clear();
            {window.location.href="/"}
          }

          function Admin(){
            const role = (localStorage.getItem("role"));
            if (role === "Admin"){
              return true;
            }
          }

          
        const token = (localStorage.getItem("token"));
        const emri = (localStorage.getItem("emri"));
        return(
            <Navbar bg= "dark" expand="lg">
                <NavLink className="navbar-brand" to="/"  >
                   <b>&nbsp;Enflix</b> 
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav "/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/">
                    Filmat
                </NavLink>
                </Nav>

                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/Serialet">
                    Serialet
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/aktorfilmi">
                    Aktoret
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/regjisorfilmi">
                    Regjisoret
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/producentfilmi">
                    Producentet
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/skenaristfilmi">
                    Skenaristet
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/rrethneshh">
                    Rreth Nesh
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/dergomesazh">
                    Kontakti
                </NavLink>
                </Nav>
                {token && Admin() && 
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/dashboard">
                    Dashboard
                </NavLink>
                </Nav>}
                </Navbar.Collapse> 
                {!token &&<Navbar.Collapse className="right">
                <Nav  className="right">
                <NavLink className="nav-link d-inline p-1 text-light mr-5" to="/login">
                    <strong>Login&nbsp;</strong>
                </NavLink>
                </Nav>
                </Navbar.Collapse>}
                {token && <Navbar.Collapse className="right">
                <Nav  className="right">
                <NavLink className="nav-link d-inline p-1 text-light mr-5" onClick={logout} to="/">
                     <strong>Logout&nbsp;</strong>
                </NavLink>
                </Nav>
                <Nav  className="right">
                <NavLink className="nav-link d-inline p-1 text-light mr-5" to="#">
                     <strong>Mirsevini, {emri}&nbsp;</strong>
                </NavLink>
                </Nav>
                </Navbar.Collapse>}
            
              
            </Navbar>
        )
    }
}