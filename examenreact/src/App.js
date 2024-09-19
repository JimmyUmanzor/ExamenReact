import React, { useState, useEffect } from 'react';
import CategoriaLista from './components/CategoriaLista';
import CategoriaFormulario from './components/CategoriaFormulario';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [estaEditando, setEstaEditando] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories/')
      if (Array.isArray(response.data)) {
        setCategorias(response.data)
      } else {
        Swal.fire('Error', 'Los datos obtenidos no son válidos', 'error')
      }
    } catch (error) {
      Swal.fire('Error', 'Error al obtener las categorías', 'error')
    }
  };

  useEffect(() => {
    obtenerCategorias()
  }, []);

  const eliminarCategoria = async (id) => {
    try {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmacion.isConfirmed) {
        await axios.delete(`https://api.escuelajs.co/api/v1/categories/${id}`)
        setCategorias(categorias.filter(categoria => categoria.id !== id))
        Swal.fire('Eliminada', 'La categoría ha sido eliminada', 'success')
      }
    } catch (error) {
      Swal.fire('Error', 'Error al eliminar la categoría', 'error')
    }
  }

  const manejarAbrirModal = () => {
    setEstaEditando(false)
    setCategoriaSeleccionada(null)
    setModalVisible(true)
  }

  const manejarCerrarModal = () => {
    setModalVisible(false)
  }

  return (
    <div className="container">
      <h1 className="my-4">Listado de Categorías</h1>
      <Button variant="primary" onClick={manejarAbrirModal}>
        Agregar Categoría
      </Button>
      <CategoriaLista
        categorias={categorias}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        setEstaEditando={setEstaEditando}
        eliminarCategoria={eliminarCategoria}
        setModalVisible={setModalVisible}  
      />
      <Modal show={modalVisible} onHide={manejarCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{estaEditando ? 'Editar Categoría' : 'Agregar Categoría'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoriaFormulario
            categorias={categorias}
            setCategorias={setCategorias}
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
            estaEditando={estaEditando}
            setEstaEditando={setEstaEditando}
            manejarCerrarModal={manejarCerrarModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={manejarCerrarModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default App
