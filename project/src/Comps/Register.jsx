
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import React, { useEffect, useRef,useState } from 'react'; 
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

function Register() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error,setError]= useState(false)

  const load = () => {
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
    }, 500);
};


const msgs = useRef(null);

const send=async ()=>{
  const body={name, username, password, phone, address,email}
  let newUser
  try{
    newUser=await axios.post("http://localhost:4321/api/users/register",body)
    msgs.current.clear();
    msgs.current.show([
      { sticky: false, life: 4000, severity: 'success', detail: "  נרשמת בהצלחה:) עבור לכניסה", closable: true }
    ]);
  }
  catch(err)
  {
     msgs.current.clear();
     msgs.current.show([
       { sticky: false, life: 4000, severity: 'error', detail: err.response.data, closable: true }
     ]);

     if(err.response.data !== "duplicate username")
     setError(true)
  }

  setAddress("")
  setEmail("")
  setName("")
  setPassword("")
  setUserName("")
  setPhone("")
}

    return(
        
        < >
          {/* <h1>הרשמה</h1> */}
          <form   style={{ display:"flex","flexDirection":"column","gap":"2rem","alignItems":"center"}} className="card flex justify-content-center">
              <FloatLabel>
                    <InputText id="username" value={username} onChange={(e) =>{setUserName(e.target.value); setError(false)}} />
                    <label htmlFor="username">תעודת זהות</label>
                    {error&&<Message severity="error" text="שדה חובה" className="ml-2" />  }
                </FloatLabel>
                <FloatLabel>
                    <Password inputId="password" value={password} onChange={(e) => {setPassword(e.target.value);setError(false)}} />
                    <label htmlFor="password">ססמא</label> 
                    {error&&<Message severity="error" text="שדה חובה" className="ml-2" />  } 
                </FloatLabel> 
                <FloatLabel>
                    <InputText id="name" value={name} onChange={(e) => {setName(e.target.value);setError(false)}} />
                    <label htmlFor="name">שם</label>
                    {error&&<Message severity="error" text="שדה חובה" className="ml-2" />  }
                </FloatLabel>
                <FloatLabel>
                    <InputText id="address" value={address} onChange={(e) => {setAddress(e.target.value);setError(false)}} />
                    <label htmlFor="address">כתובת</label>
                    {error&&<Message severity="error" text="שדה חובה" className="ml-2" />  }
                </FloatLabel>
                <FloatLabel>
                    <InputText id="phone" value={phone} onChange={(e) => {setPhone(e.target.value);setError(false)}} />
                    <label htmlFor="phone">טלפון</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value);setError(false)}} />
                    <label htmlFor="email">כתובת מייל</label>
                    {error&&<Message severity="error" text="שדה חובה" className="ml-2" />  }
                </FloatLabel>
                
                <Button  label="" icon="pi pi-check" loading={loading}  onClick={()=>{load() ; send()}} />
          </form>
           
            <Messages ref={msgs} />
         
        </>
    )
}

export default Register