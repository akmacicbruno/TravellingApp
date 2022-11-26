import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { uid } from 'uid';
import { set, ref } from "firebase/database";
import { auth, db } from "../firebase.js";
import axios from 'axios';


function ModalAddTravel() {
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  
  const [countries, setCountries] = useState([{
        'name':'',
        'alpha2Code':'',
        'independent': '',
        'flag': ''
    }]);
 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const writeToDatabase = () => {
    if (!naziv || !status || !opis || !drzava) {
      alert("Provjerite jeste li unijeli sve podatke.")
    }
    else {
      const uidd = uid();
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        travel: naziv,
        status: status,
        opis: opis,
        drzava: drzava,
        uidd: uidd
      });

      setNaziv("");
      setShow(false);
      setStatus(getInitialState);
      setOpis("");
      setDrzava(getInitialDrzava);
    }
      
  };

  const getInitialState = () => {
    const value = "1";
    return value;
  };
  const getInitialDrzava = () => {
    const value = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg";
    return value;
  };
  const [drzava, setDrzava] = useState(getInitialDrzava);
  const [status, setStatus] = useState(getInitialState);

  const handleNaziv = (e) => {
    setNaziv(e.target.value)
  }

  const handleStatus = (e) => {
    setStatus(e.target.value);
  }
  const handleOpis = (e) => {
    setOpis(e.target.value);
  }
  const handleDrzava = (e) => {
    setDrzava(e.target.value);
  }
  function getCountries() {
    axios.get('https://restcountries.com/v2/all?fields=name,alpha2Code,flag').then(function(response){
        setCountries(response.data);
    })
  }
  useEffect(()=> {
    getCountries();
  },
  [])

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Dodaj putovanje
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodavanje novih putovanja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Naziv mjesta koje ste posjetili</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ovdje unesite naziv"
                autoFocus
                value={naziv}
                onChange={handleNaziv}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea3"
            >
              <Form.Label>Odaberite državu u kojoj se destinacija nalazi</Form.Label>
              <Form.Select aria-label="Default select example"
              value={drzava}
              label="Drzava"
              onChange={handleDrzava}>
                {Array.from(countries).map((country) => 
                  <option key={country.name} value={country.flag}>{country.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Odaberite status putovanja</Form.Label>
              <Form.Select aria-label="Default select example"
              value={status}
              label="Status"
              onChange={handleStatus}>
                <option value="1">Obavljeno</option>
                <option value="2">U pripremi</option>
                <option value="3">Želja</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea2"
            >
              <Form.Label>Opišite što ste posjetili ili želite posjetiti</Form.Label>
              <Form.Control as="textarea" value={opis} label="Opis" onChange={handleOpis} rows={5} placeholder="Ukratko opišite što ste vidjeli i doživjeli na putovanju ili želite vidjeti na putovanju koje planirate." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Odustani
          </Button>
          <Button variant="primary" onClick={writeToDatabase}>
            Spremi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddTravel;