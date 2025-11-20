
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';      
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
// import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { update } from "../Store/Slices/msgSlice"

function Manage() {

    //states
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    // const [sale, setSale] = useState(false)
    const [updated,setUpdated] = useState(false)
    const [visible2, setVisible2]= useState(false)
    const [prodNow, setProdNow]=useState()
    
    
    //טעינה
    useEffect( () => {  
        fetchData()
    }, [updated]);
    
    //תזכורות
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const [msg,setMsg] = useState(false)
    const [message,setMessage] = useState("")

    let a = useSelector(store=>store.msgSlice.msg)

    const updateMsg = ()=>{
        a = dispatch(update({msg:message}))
        navigate("/start")
    }

    //ייבוא המוצרים
    const fetchData = async ()=>
    {
      try{
        const {data}= await axios.get("http://localhost:4321/products/all")
        setProducts(data)
        setLoading(false)
        // console.log(products);
      }
      catch(err)
      {
        console.log(err);
        setLoading(true)
      }
    }

    //מבצע?
    const getSeverity = (product) => {
        if (product.onSale) 
                return 'success';
        else
                return 'warning';
    }

    //הוספת מוצר
    const addProd= async ()=>{
        const body= {name, price, onSale:checked, picture:image}
        try{
            const  added= await axios.post("http://localhost:4321/products/add", body, {headers:{"Authorization":"Bearer "+localStorage.getItem("token")}})
            console.log(added);
            setUpdated(!updated)
        }
        catch(err)
        {
            console.log(err.response.data);
        }
    }

    //מחיקת מוצר
    const del= async (product)=>
    {
        const body= {_id:product._id}
        try{
          const deleted = await axios.delete("http://localhost:4321/products/delete", {data:body,headers:{Authorization: "Bearer "+localStorage.getItem("token")}})
          console.log(deleted);
          setUpdated(!updated)
        }
        catch(err)
        {
          console.log(err.response.data);
        }
    }

    //עדכון מוצר
    const updt= async ()=>{
       const body= {_id:prodNow._id,name,picture:image,onSale:checked,price}
        try{
            const {data} = await axios.put("http://localhost:4321/products/update",body,{headers:{Authorization: "Bearer "+localStorage.getItem("token")}})
            console.log(data);
            setUpdated(!updated)
        }
        catch(err){
            console.log(err.response.data);
        }
    }
    
    
    //תצוגת רשימה
    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:4321/${product.picture}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            {/* <Rating value={product.rating}  cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold"> מוצר מבית לוגו </span>
                                </span>
                                {product.onSale && <Tag value="מבצע" severity={getSeverity(product)}></Tag>}
                                {!product.onSale && <Tag value="קולקציה חדשה" severity={getSeverity(product)}></Tag>}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button onClick={()=>del(product)} icon="pi pi-trash" className="p-button-rounded" ></Button>
                            <Button onClick={()=>{setVisible2(true);setProdNow(product);setChecked(product.onSale);setImage(product.picture); setName(product.name);setPrice(product.price)}} icon="pi pi-list-check" className="p-button-rounded" ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }
        return listItem(product, index);

    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
            </div>
        );
    };



    
    return (
       <>
        <div className="card flex justify-content-center">
            <Button label="הוסף מוצר" icon="pi pi-plus" onClick={()=>{setVisible(true)}} />
            {(!msg)&&<Button label="התזכורות שלי" icon="pi pi-plus" onClick={()=>{setMsg(!msg)}} className='ml-3' />}
                {(msg)&&<div className='inline ml-2'>
                        <Button label="שמור" icon="pi pi-check" onClick={()=>{setMsg(!msg);updateMsg() }} />
                        <InputText onChange={(e)=>setMessage(e.target.value)} className='ml-3'></InputText>
                        <i className='pi pi-sign-out ml-3 mr-3' onClick={()=>setMsg(!msg)}></i>
                        {/* <Button icon="pi pi-check" /> */}
                        </div>}
        </div>
            
       <div className="card">
        {()=>setChecked(false)}
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                שם מוצר
                            </label>
                            <InputText id="name" onChange={(e)=>{ if(e.target.value) setName(e.target.value)}} label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>

                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                מחיר
                            </label>
                            <InputText id="price" onChange={(e)=> {if(e.target.value) setPrice(e.target.value)}} label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="number" min="0"></InputText>
                        </div>
                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                ?מבצע
                            </label>
                                <Checkbox checked={checked} onChange={(e)=>{setChecked(e.checked)}} ></Checkbox>
                            </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="picture" className="text-primary-50 font-semibold">
                                נתיב תמונה
                            </label>
                            <InputText id="picture"  label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e)=>{ if(e.target.value)  {setImage(e.target.value)}}}></InputText>
                            {/* { image&& <image src={image} ></image> } */}
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button icon="pi pi-check" onClick={(e) =>{ hide(e); addProd()}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button icon="pi pi-times"  onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
            <div className="card">
                <Dialog
                visible={visible2}
                modal
                onHide={() => {if (!visible2) return; setVisible2(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                שם מוצר
                            </label>
                            <InputText id="name" type="text" placeholder={prodNow.name} onChange={(e)=> setName(e.target.value)} label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>

                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                מחיר
                            </label>
                            <InputText id="price" placeholder={prodNow.price} onChange={(e)=> setPrice(e.target.value)} label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="number" min="0"></InputText>
                        </div>
                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                ?מבצע
                            </label>
                                <Checkbox checked={checked} onChange={e => setChecked(e.checked)} ></Checkbox>
                            </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="picture" className="text-primary-50 font-semibold">
                                נתיב תמונה
                            </label>
                            <InputText id="picture" placeholder={prodNow.picture} label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" placeholder={prodNow.picture} onChange={(e)=> setImage(e.target.value)}></InputText>
                            {/* { image&& <image src={image} ></image> } */}
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button icon="pi pi-check" onClick={(e) =>{ hide(e); updt()}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button icon="pi pi-times"  onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
                ></Dialog>
                </div>

            {loading&&
                    <div>
                        <h1>Loading...</h1>
                        <ProgressSpinner />
                    </div>
                }
            {!loading&&
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            }
            </div>
       </>
    )
}

export default Manage