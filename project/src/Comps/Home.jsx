import {Axios} from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import { Messages } from 'primereact/messages';
import { useRef } from "react";
import { Toast } from "primereact/toast";
import ShoppingCart from "./ShoppingCart";
import { Dialog } from 'primereact/dialog';
import Login from "./Login";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


function Home() {
    
    const navigate=useNavigate()
    const [hover,setHover]= useState(false)
    const [button,setButton] =useState("")
    const [visible, setVisible] = useState(false);

    const startContent = (
        <>
        <button  onClick={()=>{navigate("/start")}} onMouseOver={()=>{setHover(true);setButton("בית")}} onMouseLeave={()=>setHover(false)} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200" >
                  <i className="pi pi-home text-2xl"></i>
                    {(hover&&button==='בית')&&<span className="ml-2">{button}</span>}
        </button>
        </>
    );


    //הודעה...
    const ref = useRef(null);
    
    const nav =(path,msg)=>{
        
        if(path==="/login"||(path==="/sal" && localStorage.getItem("token")))
            setVisible(true)
        
        else if(localStorage.getItem("token")) {
             navigate(path)       
        }
        else 
        {        
            ref.current.show({severity:'info', summary: msg, detail: "עדיין לא התחברת", life: 2000 });
        }
    }
    //אישור או ביטול
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    // const confirm1 = () => {
    //     confirmDialog({
    //         message: 'Are you sure you want to proceed?',
    //         header: 'Confirmation',
    //         icon: 'pi pi-exclamation-triangle',
    //         defaultFocus: 'accept',
    //         accept,
    //         reject
    //     });
    // };

    const confirm2 = () => {
        confirmDialog({
            message: 'Do you want to exit?',
            header: 'יציאה',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const centerContent = (
        <>
            {()=>console.log(visible)}
                          {(visible && (button==="סל" || button==="כניסה"))&&
                          <Dialog header={button} visible={visible} style={{ width: '70vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                                {button==="סל"&&<ShoppingCart />}
                                {button==="כניסה"&&<Login setVisible={setVisible}/>}
                        </Dialog>}

          <div style={{"display":"flex", "gap":"3rem"}}  className="flex flex-wrap align-items-center gap-100" >
            <button  onClick={()=>{nav("/manage","משתמש לא מזוהה")}} onMouseOver={()=>{setHover(true);setButton("ניהול")}} onMouseLeave={()=>setHover(false)} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200" >
                   {(hover&&button==="ניהול")&&<span className="mr-2" >{button}</span>}
                  <i className="pi pi-objects-column text-2xl"></i>
              </button>
              
              <button onClick={()=>{nav("/sal","משתמש לא מזוהה");setButton("סל")}} onMouseOver={()=>{setHover(true);setButton("סל");console.log(button);}} onMouseLeave={()=>setHover(false)} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200" >
                {(hover&&button==="סל")&&<span className="mr-2" >{button}</span>}
                <i className="pi pi-shopping-cart text-2xl"></i>
              </button>
              <button onClick={()=>navigate("/all")} onMouseOver={()=>{setHover(true);setButton("מוצרים")}} onMouseLeave={()=>setHover(false)} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {(hover&&button==="מוצרים")&&<span className="mr-2" >{button}</span>}
                <i className="pi pi-ellipsis-v text-2xl"></i>
              </button>
            
            {localStorage.getItem("token")&&<>
            <button onClick={()=>{navigate("/start");localStorage.clear();confirm2();}} onMouseOver={()=>{setHover(true);setButton("יציאה")}} onMouseLeave={()=>setHover(false)} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                {(hover&&button==="יציאה")&&<span className="mr-2" >{button}</span>}
            <i className="pi pi-sign-out text-2xl"></i>
            </button></>
            }
            {!localStorage.getItem("token")&&<>
                <button onClick={()=>nav("/login","")} onMouseOver={()=>{setHover(true);setButton("כניסה")}} onMouseLeave={()=>setHover(false)} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200" >
                    {(hover&&button==="כניסה")&&<span className="mr-2" >{button}</span>}
                    <i className="pi pi-sign-in text-2xl"></i>
            </button>
           

            {(button==="יציאה")&&<><Toast ref={toast} />
                                    <ConfirmDialog /></>}
            </>}   

            {/* <button onClick={()=>navigate("/start")} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <span style={{"fontSize":'1.5rem','fontWeight':'bold'}}>בית</span> 
                <i className="pi pi-search text-2xl"></i>
            </button> */}
            </div>
       
</>
    );
   
    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
                {localStorage.getItem("token")&&<>
                <span style={{"color":"white"}}>(:טוב לראות אותך</span>
                <Avatar image="https://localhost:4321/status.webp" shape="circle" />
                </>}
                {!localStorage.getItem("token")&&<span style={{"color":"white"}}>עדיין לא התחברת</span>}
            </div>
        </React.Fragment>
    );
    
    const msgs = useRef(null);

    return(
        
        <div>
            {/* {localStorage.getItem("token")&&<header className="w-100vw text-center text-2xl mb-2 font-italic"> 😊 טוב לראותך שוב </header>} */}
            {/* {!localStorage.getItem("token")&&<header className="w-100vw text-center text-2xl mb-2 font-italic">!עדיין לא התחברת</header>} */}
            <Toolbar  center={centerContent} end={endContent} start={startContent} className="bg-gray-900 shadow-2 mb-3" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} />
            <Toast ref={ref} position="bottom-center" />
            {/* <Toast ref={ref} position="top-left" /> */}
            
            <Outlet />
        </div>
    )
}

export default Home