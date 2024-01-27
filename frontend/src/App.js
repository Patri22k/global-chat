import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import useSWR, { mutate } from 'swr';
import { apiUrl } from './util/api';

const fetcher = (...args) => fetch(...args).then(res => res.json());
const messageEndpoint = apiUrl('/v1/message');

function App() {
  const [value, setValue] = useState(undefined);
  const [block, setBlock] = useState(false);
  const {data, error, isLoading} = useSWR(messageEndpoint, fetcher);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (block) {
      return;
    }
    if (value && value.length > 0) {
      setBlock(true);
      fetcher(messageEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([value]),
      }).then(res => {
        if (res.status == 200) {
          mutate(messageEndpoint);
        } else {
          // TODO: Err
        }
      }).finally(() => {
        setBlock(false);
      });
      setValue(undefined);
      document.getElementById('chat-border').scrollIntoView();
    }
  }

  return (
    <>
      <div className="text-bar">
        <div className='chat'>
          {!error && !isLoading && data ? <Messages data={data} /> : null}
          <div id="chat-border"></div>
        </div>
        {error ? <p>Error: {JSON.stringify(error)} ({messageEndpoint})</p> : null}
        <form className='inner-text-bar'
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            className='input-text' 
            onChange={(e) => setValue(e.target.value)}
            value = {value ?? ""}
          />
          <button disabled={block || isLoading} type="submit">
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

function Messages({ data }) {
  const delectionHandler = (index) => {
    return (e) => {
      e.preventDefault();
      // TODO: Deletion code
    }
  }

  return (
    data.length > 0 ? (
      <>{data.map((val, key) => (
        <div className='inner-chat-wrapper' key={key}>
          <div className='inner-chat' style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <div style={{
              width: 'calc(100% - 20px)'
            }}>
              <p>{val}</p>
            </div>
            <div className='inner-chat-tools' style={{
              display: 'flex',
              flexDirection: 'column',
              width: '20px'
            }}>
              <button onClick={delectionHandler(key)} style={{
                marginTop: 'auto'
              }}></button>
            </div>
          </div>
        </div>
      ))}</>
    ) : <p>No messages.</p>
  )
}

export default App;
