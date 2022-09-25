import { useEffect } from 'react';
import ResumenEmpresas from './components/resumen-empresas';
import Loading from './components/loading';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListadoEstaciones from './components/listado-estaciones';

function App() {
  useEffect(() => {
    /* fetchData() */
    console.log("Renderizado")
  },[])
  return (
    <div className="App">
      <ListadoEstaciones />
      <ResumenEmpresas />
    </div>
  );
}

export default App;
