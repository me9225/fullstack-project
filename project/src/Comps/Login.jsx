import axios, {Axios} from "axios";
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import Register from "./Register";

function Login({setVisible}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible1, setVisible1] = useState(false)

  const navigate = useNavigate()

  const load = () => {
      setLoading(true);

      setTimeout(() => {
          setLoading(false);
      }, 500);
  };
  
  
const msgs = useRef(null);

const send=async ()=>{
  const body={username, password}

  try{
    const {data} = await axios.post("http://localhost:4321/api/users/login",body)
    navigate("/all")
    console.log(data);
    localStorage.setItem("token", data)
  }
  catch(err)
  {
     msgs.current?.clear();
     msgs.current?.show([
       { sticky: false, life: 4000, severity: 'error', detail: err.response.data, closable: true }
     ]);

  }

  setPassword("")
  setUserName("")

}

  return(
        < >
        <div style={{ display:"flex","flexDirection":"column","gap":"2rem","alignItems":"center"}} className="card flex justify-content-center">
          <FloatLabel>
                  <InputText id="username" tooltip="Enter your username"  tooltipOptions={{ position: 'top' }} value={username} onChange={(e) => setUserName(e.target.value)} className="w-17rem" />
                  <label htmlFor="username">Username</label>
            </FloatLabel>
            <FloatLabel>
              <Password value={password} tooltip="Enter your password"  tooltipOptions={{ position: 'top' }} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} toggleMask className="w-0.5rem" />
              <label htmlFor="password">Password</label>  
            </FloatLabel> 
            <div className="card flex-row gap-5" style={{"display":"flex","gap":"10"}}>
            <Button  icon="pi pi-check" loading={loading} onClick={()=>{load();send(); setVisible(false) }} />
            <Button  icon="pi pi-user-plus" onClick={()=>setVisible(true)} />
            </div>
        </div>
        <Messages ref={msgs} />

        <Dialog header="הרשמה" visible={visible1} style={{ width: '50vw' }} onHide={() => {if (!visible1) return; setVisible1(false); }}>
                <Register />
        </Dialog>

        </>
    )
}

export default Login 