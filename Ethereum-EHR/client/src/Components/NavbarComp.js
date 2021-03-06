import React, { Component } from 'react'
import { Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap'

class NavbarComp extends Component {
  render() {
    let isLogged = this.props.isLogged ? true : false

    return (
      <div bg="dark">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home" style={{ fontWeight: 'bold' }}>
            EHR
          </Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline>
            {isLogged ? (
              <Button
                variant="outline-light"
                onClick={() => this.props.onlogout()}
              >
                Logout
              </Button>
            ) : (
              <div></div>
            )}
          </Form>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComp
