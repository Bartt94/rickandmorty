import React, { useState, useEffect } from "react";
import { formatDate } from './pages/formatDate';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Pagination from '@mui/material/Pagination';


const App = () => {

  const [statepersonajes, setstatepersonajes] = useState([]);
  const [personaje, setPersonaje]= useState([]);
  const [busqueda, setBusqueda]= useState("");
  const [show, setShow] = useState(false);
  const [selectPagination, setSelectPagination] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [contPage, setcontPage] = useState(0);
  const [elementosPorPagina, setElementosPorPagina] = useState();
  const [resBusqueda, setresBusqueda] = useState();
  const [dataPersonaje, setDataPersonaje] = useState([{
    name : "",
    status : "",
    species : "",
    gender : "",
    originName : "",
    locationName : "",
    image: "",
  }]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    personajes();
  }, []);

  useEffect(() => {
    if(resBusqueda && resBusqueda.length > 0){
      calculoPages(resBusqueda);
    }else{
      calculoPages(personaje);
    }
    
  }, [pagination, resBusqueda]);

  const calculoPages = (data) => {
    const startIndex = (pagination - 1) * elementosPorPagina;
    const endIndex = startIndex + elementosPorPagina;
    const currentElements = data.slice(startIndex, endIndex);
    setSelectPagination(currentElements);

    // console.log("pagination: "+ pagination);
    // console.log("elementosPorPagina: "+ elementosPorPagina);
  }
  
  const mostraModal = async (id) => {
    // console.log("id: " + id);
    personaje && personaje.map((data)=>{

      if(data.id === id){
        setDataPersonaje(
          {
            name : data.name, 
            status: data.status,
            species: data.species,
            gender: data.gender,
            originName: data.origin.name,
            locationName: data.location.name,
            image: data.image
          }
        )
      }

    })
  }

  const personajes = async () =>{

    let resp = await axios
      .get("http://localhost:8080/personajes")
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

      const elementosPorPaginaDef = 6;
      setElementosPorPagina(elementosPorPaginaDef);

      if(resp.data){
        setPersonaje(resp.data.data);
        setstatepersonajes(resp.data.data);
        setSelectPagination(
          resp.data.data.slice(0,elementosPorPaginaDef)
        )
       
      
        const cantidadDePaginas = Math.ceil(resp.data.data.length / elementosPorPaginaDef);
        setcontPage(cantidadDePaginas);
        setPagination(1);

        // console.log(cantidadDePaginas);
      }
      
  }

  const handleChangePage = (e, value) => {
    setPagination(value);
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=statepersonajes.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      }
    });
    
    setresBusqueda(resultadosBusqueda);
    const cantidadDePaginas = Math.ceil(resultadosBusqueda.length / elementosPorPagina);
    setcontPage(cantidadDePaginas);
    // calculoPages(resultadosBusqueda);
    setPagination(1);
    // console.log(resultadosBusqueda);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <p className="text-center fs-2" id="tituloPage">RICK AND MORTY</p>
        </div>
        <br/>
        <div className="row justify-content-center">
          <input 
            className="col-6"  
            type="search" 
            aria-label="Search" 
            value={busqueda}
            placeholder="Búsqueda por nombre de personaje "
            onChange={handleChange}
          />
        </div>
        <br/>
        <div className="row">
          {/* <CharacterList></CharacterList> */}
          <div className="row justify-content-between">
            
              {/* <PaginationLink> */}
            
            {
              selectPagination && selectPagination.map((data)=>{
                return(
                  <>
                    
                      <div 
                      key={data.id} 
                      className="card mb-3 col-5" 
                      style={{padding: "15px"}}
                      variant="primary" onClick={ () => (handleShow(), mostraModal(data.id))}
                      >
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
              <Pagination count={contPage} page={pagination} onChange={handleChangePage} />
             {/* <PaginationLink count ={personaje} page ={ page} /> */}
            
          </div>
        </div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>
                    {
                      dataPersonaje.name
                    }
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="card" style={{width: "29rem"}}>
                  <img src={dataPersonaje.image} className="card-img-top" alt={dataPersonaje.image}/>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Originario de: {dataPersonaje.originName}</li>
                    <li className="list-group-item">Specie : {dataPersonaje.species}</li>
                    <li className="list-group-item">Estatus: {dataPersonaje.status}</li>
                    <li className="list-group-item">Genero: {dataPersonaje.gender}</li>
                    <li className="list-group-item">Lugar de Origen: {dataPersonaje.locationName}</li>
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              </Modal.Footer>
          </Modal>
      </div>
    </>
  );
}

export default App;
