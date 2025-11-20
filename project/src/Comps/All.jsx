import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

function All() {
  const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [loading, setLoading] = useState(false)

    //ייבוא המוצרים
    const fetchData = async ()=>
    {
      try{
        const {data}= await axios.get("http://localhost:4321/products/all")
        setProducts(data)
        setLoading(false)
      }
      catch(err)
      {
        console.log(err);
        setLoading(true)
      }
    }

    //טעינה
    useEffect( () => {  
        fetchData()
    }, []);

    //מבצע?
    const getSeverity = (product) => {
        if (product.onSale) 
                return 'success';
        else
                return 'warning';
    }

    //הודעה...
    const toastBottomCenter = useRef(null);
    const showMessage = ( product , ref, severity) => {
        const label= "נוסף לסל🛒"
        ref.current.show({ severity: severity, summary: product, detail: label, life: 3000 });
    };

    //הוספה לסל
    const addToShoppingCart= async (product)=>
    {
        const body= {prod_id:product._id}
        try{
          const added = await axios.post("http://localhost:4321/basket/add", body,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})
          console.log(added);
          showMessage( product.name,toastBottomCenter, 'info')
        }
        catch(err)
        {
          console.log(err.response.data);
        }
    }
    console.log(localStorage.getItem("token"));
    
    //לשמור את שם האתר
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
                                {localStorage.getItem("token")&&<Button onClick={() => addToShoppingCart(product)} icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    //לשמור את שם האתר
    //תצוגת גריד
    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag">מוצר מבית לוגו</i>
                        </div>
                        {product.onSale && <Tag value="מבצע" severity={getSeverity(product)}></Tag>}
                        {!product.onSale && <Tag value="קולקציה חדשה" severity={getSeverity(product)}></Tag>}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:4321/${product.picture}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        {localStorage.getItem("token")&&<Button onClick={() => addToShoppingCart(product)} icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>}
                        </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };
    return(
        
        < >
          <Toast ref={toastBottomCenter} position="bottom-center" />
          {loading&&
            <div className="card">
                <h1>Loading...</h1>
                <ProgressSpinner />
            </div>}
          {!loading&&
           <div className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
          </div> } 
        </>
    )
}


export default All