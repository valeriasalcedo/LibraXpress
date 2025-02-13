const verificarSesion = async () => {
    const token = localStorage.getItem('jwt-token');

    // Si no hay token, no está autenticado
    if (!token) return false;

    try {
        const response = await fetch('http://localhost:5000/verificar', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) return false;

        const data = await response.json();
        return data.autenticado; // Retorna true si está autenticado
    } catch (error) {
        console.error('Error verificando la sesión:', error);
        return false;
    }
};

export default verificarSesion;
