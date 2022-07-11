import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './style.css';
import img from '../src/icon_maps.png';

function App() {

  const [input , setInput] = useState('');
  const [cep, setCep] = useState({})


 async function handSearch(){
   

    if(input===''){
      alert("Preencha algum CEP")
      return;
    }

    try{

      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
 
    }catch{
      alert('ops... erro ao buscar')
      setInput("")
    }

  }


  return (
    <div className="container">
      
      <h1 className="title"><img src={img} className="logo"/> Buscador CEP</h1>

        <div className='containerInput'>
            <input 
              type="text"
              placeholder="Digite o CEP..."
              value={input}
              onChange={(e)=> setInput(e.target.value) }
              />
            <button className="buttonSearch" onClick={handSearch}>
              <FiSearch size={25} color="#fff"/>
            
            </button>
        </div>
        {Object.keys(cep).length >0 && (
            <main className='main'>
              <h2>CEP: {cep.cep}</h2>


              <span>{cep.logradouro}</span>
              <span>{cep.complemento}</span>
              <span>{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>

          </main>
        )}
        
    </div>
  );
}

export default App;