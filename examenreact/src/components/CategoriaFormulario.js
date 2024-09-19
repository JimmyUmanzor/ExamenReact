import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const CategoriaFormulario = ({
  categorias,
  setCategorias,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  estaEditando,
  setEstaEditando,
  manejarCerrarModal
}) => {
  const [nombre, setNombre] = useState('')
  const [imagenURL, setImagenURL] = useState('')

  useEffect(() => {
    if (estaEditando && categoriaSeleccionada) {
      setNombre(categoriaSeleccionada.name)
      setImagenURL(categoriaSeleccionada.image)
    } else {
      setNombre('')
      setImagenURL('')
    }
  }, [categoriaSeleccionada, estaEditando])

  const manejarSubmit = async (e) => {
    e.preventDefault()

    if (nombre.trim() === '' || imagenURL.trim() === '') {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error')
      return
    }

    try {
      if (estaEditando) {
        const confirmacion = await Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Quieres actualizar esta categoría?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, actualizar',
          cancelButtonText: 'Cancelar',
        });

        if (confirmacion.isConfirmed) {
          const updatedCategoria = { ...categoriaSeleccionada, name: nombre, image: imagenURL }
          await axios.put(`https://api.escuelajs.co/api/v1/categories/${categoriaSeleccionada.id}`, updatedCategoria)
          setCategorias(categorias.map(c => (c.id === categoriaSeleccionada.id ? updatedCategoria : c)))
          Swal.fire('Actualizada', 'La categoría ha sido actualizada', 'success')
          manejarCerrarModal()
        }
      } else {
        const nuevaCategoria = { name: nombre, image: imagenURL }
        const response = await axios.post('https://api.escuelajs.co/api/v1/categories/', nuevaCategoria)
        setCategorias([...categorias, response.data])
        Swal.fire('Agregada', 'La categoría ha sido agregada', 'success')
        manejarCerrarModal()
      }

      setNombre('')
      setImagenURL('')
      setCategoriaSeleccionada(null)
      setEstaEditando(false)
    } catch (error) {
      Swal.fire('Error', 'Error al guardar la categoría', 'error')
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre de la Categoría</label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imagenURL">URL de la Imagen</label>
        <input
          type="text"
          id="imagenURL"
          className="form-control"
          value={imagenURL}
          onChange={(e) => setImagenURL(e.target.value)}
        />
      </div>
      <Button type="submit" variant="success">
        {estaEditando ? 'Actualizar Categoría' : 'Agregar Categoría'}
      </Button>
    </form>
  )
}

export default CategoriaFormulario
