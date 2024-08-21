import React from 'react'
import { Form, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'


function CreateRecipe() {

  const {register, handleSubmit, reset, formState:{errors}} = useForm()

  const handleButtonClick =(data) =>{
   
    reset()

    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    console.log(token)

    fetch('/recipe/recipes',{
      method:'POST',
      headers:{
        'content-type':'application/json',
        'Authorization':"Bearer "+JSON.parse(token)
      },
      body:JSON.stringify(data)
      }
    
    )
    .then(res => res.json())
    .then(data =>{
      reset()
    })
  }

  return (
    <div className='container'>

        <h1>Create A Recipe</h1>
        <form >
          <Form.Group>
            <Form.Label>
              Title
            </Form.Label>
            <Form.Control type='text'
            {...register('title', {required:true, maxLength: 25})}
            />
            {errors.title && <p style={{color:"red"}}>This is the required field</p>}
            {errors.title?.type ==="maxLength" && <p style={{color:"red"}}>Title should less the 25 characters </p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={5} 
            {...register('description', {required:true, maxLength:255})}
            />

            {errors.description && <p style={{color:"red"}}>Description field is the required field</p>}
            {errors.description?.type === "maxLength" && <p style={{color:"red"}}>Description should be less than the 255 characters </p>}
          </Form.Group>
          <Form.Group>
          <Button variant='primary' onClick={handleSubmit(handleButtonClick)}>Save</Button>
          </Form.Group>
        </form>
      </div>
  )
}

export default CreateRecipe