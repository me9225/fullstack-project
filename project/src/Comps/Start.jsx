import { Image } from 'primereact/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from 'primereact/skeleton';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Start =()=>{
    
    const m = useSelector(store=>store.msgSlice.msg)
    const [msg,setMsg] = useState(false)
    const [message,setMessage] = useState("")


    //הודעות
    const dispatch = useDispatch()
    const navigate= useNavigate()

    useEffect(()=>{
    },[m,msg])
    


    return(
        <>
        <h1>hello</h1>
        <div className='flex-column'>
            {/* <h1 className="text-center" style={{"color":"black" , "font-size":"1.5rem"}}>{m}</h1> */}
            <Skeleton className="mb-2 " height="50vh" >
                <div className="bg-cover flex align-items-center justify-content-center h-32rem opacity-20 max-h-screen  bg-center" style={{"backgroundImage":"url(http://localhost:4321/smelling.webp)", backgroundSize:"cover", height:"50vh"}}> 
                {localStorage.getItem("token")&&<h1 className="lg:text-8xl text-7xl   text-black-alpha-90" >{m}</h1>}
                </div>
            </Skeleton>
          
        </div>
        <div className='flex gap-2 align-items-center justify-content-evenly' style={{height:"38vh"}}>
            <Skeleton className="mb-2 max-h-25rem max-w-25rem" size='25vw' shape='circle' >
                <Image src="http://localhost:4321/a.jpg" alt="Image" width="110%" preview />
            </Skeleton>
            <Skeleton className="mb-2 max-h-25rem max-w-25rem" size='25vw' shape='circle' >
                <Image src="http://localhost:4321/b.jpg" alt="Image" width="110%" preview />
            </Skeleton>
            <Skeleton className="mb-2 max-h-25rem max-w-25rem" size='25vw' shape='circle' >
                <Image src="http://localhost:4321/d.jpg" alt="Image" width="110%" preview />
            </Skeleton>
            <Skeleton className="mb-2 max-h-25rem max-w-25rem" size='25vw' shape='circle' >
                <Image src="http://localhost:4321/c.jpg" alt="Image" width="110%" preview />
            </Skeleton>

        </div>

     </>
    )
}
export default Start