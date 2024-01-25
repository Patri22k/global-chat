import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

function App() {
  const [value, setValue] = useState(undefined);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && value.length > 0) {
      setList([...list, value]);
      setValue(undefined);
      document.getElementById('chat-border').scrollIntoView();
    }
  }

  return (
    <>
      <div className="text-bar">
        <div className='chat'>
          {list.map(val => (
            <div className='inner-chat-wrapper'>
              <div className='inner-chat'><p>{val}</p></div>
            </div>
          ))}
          <div id="chat-border"></div>
        </div>
        <form className='inner-text-bar'
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            className='input-text' 
            onChange={(e) => setValue(e.target.value)}
            value = {value ?? ""}
          />
          <button
          type="submit">
            <FontAwesomeIcon 
              icon={faPaperPlane} 
              className='send-icon'
            />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
