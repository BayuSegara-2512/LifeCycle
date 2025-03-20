import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Komponen di-mount: Memanggil API...');

        // Mengambil data dari API sederhana
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                setData(json);
                setLoading(false);
                console.log('Data berhasil diambil:', json);
            })
            .catch(error => {
                console.error('Gagal mengambil data:', error);
                setLoading(false);
            });

        // Cleanup function ketika komponen di-unmount
        return () => {
            console.log('Komponen di-unmount. Membersihkan...');
        };
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Daftar Postingan</h1>
            {loading ? (
                <p>Memuat data...</p>
            ) : (
                <ul>
                    {data.map(post => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
