import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import LogoutIcon from '@mui/icons-material/Logout';
import '../css/style.css';
import Lottie from 'react-lottie';
import * as planeAnimation from '../img/plane_tavelling-app.json';
import Modal from "../components/ModalAddTravel";
import TravelDone from "../components/TravelDone"
import Accordion from 'react-bootstrap/Accordion';
import TravelPlan from "../components/TravelPlan";
import TravelWish from "../components/TravelWish";

function Homepage() {
    const [travels, setTravels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if (user) {
            // read
            onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
            setTravels([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map((travel) => {
                  setTravels((oldArray) => [...oldArray, travel]);
                });
            }
            });
        } else if (!user) {
            navigate("/");
        }
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigate("/");
        })
        .catch((err) => {
            alert(err.message);
        });
    };

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: planeAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
        <div className="homepage">
          <div className="homepage__user">
            <div className="homepage__user-title">
              <div className="homepage__lottie">
                <Lottie 
                  options={defaultOptions}
                  height={100}/>
              </div>
              <h1 className="homepage__user-title--text">Welcome!</h1>
            </div>
            <div className="homepage__user-signout">
              <LogoutIcon onClick={handleSignOut} className="homepage__user-signout-svg" />
            </div>
          </div>
          
          <div className="homepage__add">
            <Modal></Modal>
          </div>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Obavljena putovanja</Accordion.Header>
              <Accordion.Body>
                <TravelDone></TravelDone>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Putovanja u planiranju</Accordion.Header>
              <Accordion.Body>
                <TravelPlan></TravelPlan>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Životna želja</Accordion.Header>
              <Accordion.Body>
                <TravelWish></TravelWish>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
    );
}

export default Homepage;