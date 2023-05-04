import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import './style/Chatbox.css' // import chatbox styles

function Chatbox() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState({
        msg: "", cls: "",
    });
    const [messages, setMessages] = useState([]);

    const [resmessage, setresMessage] = useState({
        msg: "", cls: "",
    });


    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (event) => {
        setMessage({ msg: event.target.value, cls: "message" });
    };

    let data;
    let words = [
        " tests good with ",
        " makes great combo with ",
        " tests delicious with ",
        " worth to eat with ",
        " made to be eaten with ",
        " people loves to eat with "
    ]
    const handleSend = async (event) => {
        event.preventDefault();

        if (message.msg.trim() !== "" && message.msg) {
            setMessages([...messages, message]);

            data = await axios.post(`${process.env.REACT_APP_HOST_IP}/py`, { food: message.msg });
            console.log(data.data); 

            if (data.data.message) {
                setresMessage({ msg: data.data.message, cls: "response" });
            }
            else if (data.data[0]) {
                let str="";
                data.data.map((ind)=>{
                    if(ind.food1)
                        str+=ind.food1 + ", ";
                    if(ind.food2)
                        str+=ind.food2 + ", ";
                })
                str = str.slice(0,str.length-2);
                let res = str + words[Math.floor((Math.random()*10 % 5))] + message.msg;
                res = res.charAt(0).toUpperCase() + res.slice(1);

                setresMessage({ msg: res, cls: "response" });
            }

            setMessage({ msg: "", cls: "message" });
        }
        
    };
    

    useEffect(() => {
        if (resmessage.msg != "") {
            setMessages([...messages, resmessage]);
            setMessage({ msg: "", cls: "message" });
        }
    }, [resmessage || data])

    return (
        <div>
            {/* Chat button */}
            <button className="chat-btn" onClick={handleToggle}>
                <span>Chat</span>
            </button>

            {/* Chat box */}
            {isOpen && (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <h3>Food Recommandation</h3>
                        <button className="close-btn" onClick={handleToggle}>
                            &times;
                        </button>
                    </div>
                    <div className="chatbox-messages" id="chatbox-messages">
                        {Object.keys(messages).length > 0 && Object.keys(messages).map((msg, index) => (
                            <div key={index} className={messages[msg].cls}>
                                {messages[msg].msg}
                            </div>
                        ))}
                    </div>
                    <form className="chatbox-input" onSubmit={handleSend}>
                        <input type="text" placeholder="Find Best Food Pair..." value={message.msg} onChange={handleInputChange} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chatbox;
