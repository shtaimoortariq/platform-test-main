import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UploadProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setLoading(true);
        const file = e?.target.files[0]
        const data = new FormData();
        data.append('csv', file, file.name);
        fetch("http://localhost:5000/upload", {
            method: 'POST',
            headers: {
                "Content-Application": 'multipart/form-data'
            },
            body: data,
        }).then((res) => res.json()).then(async data => {
            setLoading(false)
            await localStorage.setItem('products', JSON.stringify(data));
            navigate('/products');
        }).catch((error) => setError(error.message));
    }

    return (
        <div>
            {loading ? <div></div> : error ? error : <input type="file" name="file" onChange={(e) => changeHandler(e)} accept=".csv" />
            }
        </div>
    );
}

export default UploadProduct;