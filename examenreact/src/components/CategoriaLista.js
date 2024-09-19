import React from 'react';

const CategoriaLista = ({ categorias, setCategoriaSeleccionada, setEstaEditando, eliminarCategoria, setModalVisible }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Controles</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(categorias) && categorias.length > 0 ? (
          categorias.map(categoria => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.name}</td>
              <td><img src={categoria.image} alt={categoria.name} style={{ width: '50px' }} /></td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => {
                  setCategoriaSeleccionada(categoria)
                  setEstaEditando(true)
                  setModalVisible(true)
                }}>
                  <i className="fas fa-edit"></i></button>
                <button className="btn btn-danger" onClick={() => eliminarCategoria(categoria.id)}>
                  <i className="fas fa-trash"></i></button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Ups....No hay categorías para visualizar</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default CategoriaLista
