import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ChatPage() {
    const [data,setData] = useState([]);

    const fetchData = async () => {
        const {data} = await axios.get('http://localhost:5000/chat');
        setData(data.data);
        //console.log(data.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div>
      dklfjsdl
          {
              data.map((d) => {
                  return <h2 key={ d._id }>{d.chatName }</h2>
              })
       }
    </div>
  )
}

export default ChatPage
