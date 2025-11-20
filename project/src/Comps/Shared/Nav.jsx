import {Axios} from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';


function Nav() {

  const navigate=useNavigate()

  const centerContent = (
    <div style={{"display":"flex", "gap":"4rem"}}  className="flex flex-wrap align-items-center gap-100" >
      <button onClick={()=>navigate("/main/manage")} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-7rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200" >
             <span style={{"fontSize":'1.5rem','fontWeight':'bold'}}>ניהול</span>
            <i className="pi pi-objects-column text-2xl"></i>
        </button>
        <button onClick={()=>navigate("/main/sal")} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-7rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200" >
             <span style={{"fontSize":'1.5rem','fontWeight':'bold'}}>הסל שלי</span>
            <i className="pi pi-shopping-cart text-2xl"></i>
        </button>
        <button onClick={()=>{navigate("/start");localStorage.clear()}} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-7rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
             <span style={{"fontSize":'1.5rem','fontWeight':'bold'}}>יציאה</span>
            <i className="pi pi-user text-2xl"></i>
        </button>
        <button onClick={()=>navigate("/main/all")} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-7rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
            <span style={{"fontSize":'1.5rem','fontWeight':'bold'}}>מוצרים</span> 
            <i className="pi pi-ellipsis-v text-2xl"></i>
        </button>
    </div>
);

    return(
        
        < >
          <div className="card" >
            <Toolbar center={centerContent} className="bg-gray-900 shadow-2" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))',/* position:"fixed"*/ }} />
          </div>
        </>
    )
}

export default Nav

