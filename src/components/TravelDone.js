import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { ref, onValue, remove } from "firebase/database";
import DeleteIcon from "@mui/icons-material/Delete";



function TravelDone() {
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
                    if (travel.status == 1) {
                        setTravels((oldArray) => [...oldArray, travel]);
                    }
                });
            }
            });
        } else if (!user) {
            navigate("/");
        }
        });
    }, []);

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    return(
        <div className="homepage__content">
            {travels.map((travel) => (
              <div className="homepage__content__card">
                <img src={travel.drzava} className="homepage__content__card-img" alt="Zastava države"></img>
                <h1 className="homepage__content__card-title">{travel.travel}</h1>
                <p className="homepage__content__card-desc">{travel.opis}</p>
                <div className="homepage__content__card-icons">
                  <DeleteIcon
                    fontSize="large"
                    onClick={() => handleDelete(travel.uidd)}
                    className="homepage__content__card-icons-svg"
                  />
                  </div>
              </div>
            ))}
          </div>
    )
}

export default TravelDone;