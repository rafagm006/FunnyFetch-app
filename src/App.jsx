import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState(''); // Se almacenan los chistes o frases
  const [contentType, setContentType] = useState('chiste'); // Se almacena el tipo de contenido chiste o frase
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //se ejecuta cuando la aplicación se monte inicialmente
    loadContent();
  }, [contentType]); // Este efecto se ejecuta cuando contentType cambie

  const loadContent = async () => {
    try {
      setLoading(true);

      let apiUrl = '';
      if (contentType === 'chiste') {
        // Si se elige un chiste
        apiUrl = 'https://icanhazdadjoke.com/';
      } else {
        // Si se elige una frase
        apiUrl = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
      }

      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (contentType === 'chiste') {
        const data = await response.json();
        setContent(data.joke);
      } else {
        const data = await response.json();
        setContent(data[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Chistes y Frases Célebres</h1>
      <select
        value={contentType}
        onChange={(e) => setContentType(e.target.value)}
      >
        <option value="chiste">Chiste</option>
        <option value="frase">Frase</option>
      </select>
      <br />
      <br />
      <button onClick={() => loadContent()}>Obtener</button>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        content && <p>{content}</p>
      )}
    </div>
  );
}

export default App;
