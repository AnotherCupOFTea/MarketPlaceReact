import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { AdminContext } from "../context/AdminProvider";
import ProductCard from "./ProductCard";

const AllProducts = () => {
    const {getProducts, products} = React.useContext(AdminContext);
    useEffect(() => {
        getProducts();
    }, [])
    console.log(products)
    if (!products) {
        return <h2>Loading...</h2>;
      }
    return (
        <div>
            <Grid container spacing={4}>
            <h3>Пицца</h3>
                {products.map((item) => 
                     
                         item.category === "Pizza" && (
                        <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <div id="pizza">
                           
                            <ProductCard product={item}/>                          
                        </div>
                    </Grid>
                     )
                    
               )}
            </Grid>        
            <Grid container spacing={4}>
                <h3>Комбо</h3>
                {products.map((item) => 
                item.category=== "Snacks" &&
                    <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <div id="snacks">
                            <ProductCard product={item}/>                          
                        </div>
                    </Grid>
                    )}
            </Grid>
                    <Grid container spacing={4}>
                        <h3>Десерт</h3>
                    {products.map((item) => 
                    item.category=== "Dessert" &&
                    <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <div id="dessert">
                            <ProductCard product={item}/> 
                        </div>
                    </Grid>
                    )}
            </Grid>
                    <Grid container spacing={4}>
                        <h3>Напитки</h3>
                    {products.map((item) => 
                    item.category=== "Drinks" &&
                   <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <div id="drinks">
                            <ProductCard product={item}/>                       
                        </div>
                    </Grid>
            )}
            </Grid>        
            <Grid container spacing={4}>
                <h3>Другое</h3>
                    {products.map((item) => 
                    item.category === "Other"  &&
                    <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <div id="other">
                            <ProductCard product={item}/>                         
                        </div>
                        
                    </Grid>
                )}
            </Grid>
        </div>
    );
=======
  const { getProducts, products } = React.useContext(AdminContext);
  useEffect(() => {
    getProducts();
  }, []);
  // console.log(products)
  if (!products) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Grid container spacing={4}>
        {products.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4}>
            <div id="pizza">
              {item.category === "Pizza" ? (
                <ProductCard product={item} />
              ) : (
                item
              )}
            </div>
            <div id="pizza">
              {item.category === "Snacks" ? (
                <ProductCard product={item} />
              ) : (
                item
              )}
            </div>
            <div id="pizza">
              {item.category === "Dessert" ? (
                <ProductCard product={item} />
              ) : (
                item
              )}
            </div>
            <div id="pizza">
              {item.category === "Drinks" ? (
                <ProductCard product={item} />
              ) : (
                item
              )}
            </div>
            <div id="pizza">
              {item.category === "Other" ? (
                <ProductCard product={item} />
              ) : (
                item
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;
