
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';


function ShoppingCart() {

  const [baskets, setBaskets] = useState([]);
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');
  const [loading, setLoading] = useState(false)
  const [updated,setUpdated] = useState(false)
  const [value, setValue] = useState(25);

  //ייבוא המוצרים
  const fetchData = async ()=>
    {
      try{
        const {data}= await axios.get("http://localhost:4321/basket/all",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})
        setBaskets(data)
        setLoading(false)
      }
      catch(err)
      {
        console.log(err);
        setLoading(true)
      }
    }
    
    useEffect(() => {
      fetchData()
    }, [updated]);
    
    //הסרה מהסל
    const deleteProd= async (product)=>
    {
        try{
          const deleted = await axios.delete("http://localhost:4321/basket/delete",{data:{prod:product.prod._id},headers:{Authorization:"Bearer "+localStorage.getItem("token")}})
          console.log(deleted);
          setUpdated(!updated)
        }
        catch(err){
          console.log(err.response.data);
        }
    }
    
    //עדכון כמות
    const updateAmount= async (prod,amount)=>{
      const body={amount,prod:prod.prod}
      console.log(body);
        try{
          const {data}= await axios.put("http://localhost:4321/basket/update",body,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})
          console.log(data);
        }
        catch(err){
          console.log(err.response.data);
        }
    }
    
    //מבצע?
    const getSeverity = (product) => {
      if (product.onSale) 
              return 'success';
      else
              return 'warning';
  }
            
            
      // //מיון 
      // const sortOptions = [
      //     { label: 'Price High to Low', value: '!price' },
      //     { label: 'Price Low to High', value: 'price' }
      // ];

  //     const onSortChange = (event) => {      
  //     const value = event.value;
  //     if (value.indexOf('!') === 0) {
  //         setSortOrder(-1);
  //         setSortField(value.substring(1, value.length));
  //         setSortKey(value);
  //     } else {
  //         setSortOrder(1);
  //         setSortField(value);
  //         setSortKey(value);
  //     }
  // };

  // const header = () => {
  //     return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={(e)=>onSortChange(e)} className="w-full sm:w-14rem" />;
  // };

  //לשמור את שם האתר
  const itemTemplate = (product, index) => {
      return (
          <div className="col-12" key={product.price}>
              <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                  <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:4321/${product.prod?.picture}`} alt={product.name} />
                  <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                      <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                          <div className="text-2xl font-bold text-900">{product.prod?.name}</div>
                          <div className="flex align-items-center gap-3">
                              <span className="flex align-items-center gap-2">
                                  <i className="pi pi-tag"></i>
                                  <span className="font-semibold"> מוצר מבית לוגו </span>
                              </span>
                              {product.prod?.onSale && <Tag value="מבצע" severity={getSeverity(product.prod)}></Tag>}
                              {!product.prod?.onSale && <Tag value="קולקציה חדשה" severity={getSeverity(product.prod)}></Tag>}
                          </div>
                      </div>
                          <div className="flex sm:flex-column align-items-end gap-5">
                            <span id="price" className="text-2xl font-semibold">${product.prod?.price}</span>
                      <div className="flex sm:flex-column align-items-end sm:align-items-end gap-3 sm:gap-2">
                            <div className="flex-auto w-min">
                              <InputNumber  inputId="minmax-buttons" value={product.amount} onValueChange={(e) =>updateAmount(product,e.value)} mode="decimal" showButtons min={1} max={9} style={{width:"50%"}}/>
                            </div>
                              <Button onClick={()=>deleteProd(product)} icon="pi pi-trash" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                          </div>
                      </div>
              </div>
          </div>
          </div>
      );
  };

  const listTemplate = () => {
      if (!baskets || baskets.length === 0) return null;

      let list = baskets.map((product, index) => {
          return itemTemplate(product, index);
      });

      return <div className="grid grid-nogutter">{list}</div>;
  };
    return(
        
        < >
          <div className="card">
            {!loading&&<DataView value={baskets} listTemplate={listTemplate}  />}
            {loading&&<h1>🛒הסל שלך מחכה להתמלא🛒</h1>}
        </div>
        </>
    )
}

export default ShoppingCart