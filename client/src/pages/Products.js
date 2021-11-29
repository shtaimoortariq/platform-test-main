import React, { useEffect, useState } from 'react'


const Products = () => {
    const [products, setProducts] = useState([]);

    const saveProductsData = async () => {
        const data = await localStorage.getItem('products')
        setProducts(JSON.parse(data));
    };

    useEffect(() => {
        saveProductsData();
    }, [saveProductsData])
    return (
        <div>
            {products.map((product) => {
                return (
                    <div>
                        <span>{product.name}</span>
                        <img src={product.picture.url} width={product.picture.width} height={product.picture.height} />
                    </div>
                );
            })}
        </div>
    );
}


export default Products;