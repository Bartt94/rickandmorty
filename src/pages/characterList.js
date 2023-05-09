import React, { useState, useEffect } from "react";
import { formatDate } from '../pages/formatDate'
import axios from "axios";

export const CharacterList = () => {

  const [statepersonajes, setstatepersonajes] = useState([]);

  useEffect(() => {
    personajes();
  }, []);

  const personajes = async () =>{

    let resp = await axios
      .get("https://rickanmortyback-production.up.railway.app/personajes")
      .then((response) => {
        // console.log(response);
        return { ok: true, data: response.data };
      })
      .catch((error) => {
        // if (error.response.status === 404) return { ok: false };
        return {
          ok: false,
          msg: error,
        };
      });

      if(resp.data){
        setstatepersonajes(resp.data.data);
      }
      
  }
 
  
  return (
    <>
      <div className="row justify-content-between">
        {
          Array.isArray(statepersonajes) && statepersonajes.map((data)=>{
            return(
              <>
                <div key={data.id} className="card mb-3 col-5" style={{padding: "15px"}}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={data.image} className="card-img" alt={data.image}/>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <h6>Specie: {data.species}</h6>
                        <h6>Género: {data.gender}</h6>
                        <h6>Creado en: {
                          formatDate(data.created)
                        }
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  );
};
