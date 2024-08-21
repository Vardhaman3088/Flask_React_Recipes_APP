import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipe";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const LoggedinHome = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleButtonClick = (data) => {
    console.log(data);
    updateRecipe(data)
    reset();
  };
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/recipe/recipes")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setRecipes(data);
      });
  }, []);

  useEffect(() => {
    console.log("THis is another use effect hook ");
    console.log(recipes);
  }, [recipes]);

  const getAllRecipes = () =>{
    fetch("http://localhost:5000/recipe/recipes")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setRecipes(data);
      });
  }
 
  const closeModal = () => {
    setShow(false);
  };

  const showModal = (id) => {
    // console.log(id)
    setShow(true);
    setRecipeId(id);

    recipes.map((recipe) => {
      if (recipe.id == id) {
        setValue("title", recipe.title);
        setValue("description", recipe.description);
      }
    });
  };
  const updateRecipe = (data) => {
    console.log(data);

    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    console.log(token)
    console.log(recipeId)

    fetch(`/recipe/recipe/${recipeId}`,
      {
        method:'PUT',
        headers:{
          'content-type':'application/json',
          'Authorization':`Bearer ${JSON.parse(token)}`
        },
        body:JSON.stringify(data)
      }
    )
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // const reload = window.location.reload();
      getAllRecipes()
      setShow(false)

      // reload()
    })
    .catch(err=> console.log(err))
  };


  const delteRecipe =(id)=>{
    console.log(id)
    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    fetch(`/recipe/recipe/${id}`,{
      method:'DELETE',
      headers:{
        'content-type':'application/json',
        'Authorization':`Bearer ${JSON.parse(token)}`
      },
      // in delete request it body is not required 
    })
    .then(res => res.json())
    .then(data => {
      // const reload = window.location.reload()
      console.log(data)
      getAllRecipes()
      
    })
    .catch(err=> console.log(err))
  }
  return (
    <>
      <div className="recipe container">
        <Modal show={show} size="lg" onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  {...register("title", { required: true, maxLength: 25 })}
                />
                {errors.title && (
                  <p style={{ color: "red" }}>This is the required field</p>
                )}
                {errors.title?.type === "maxLength" && (
                  <p style={{ color: "red" }}>
                    Title should less the 25 characters{" "}
                  </p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  {...register("description", {
                    required: true,
                    maxLength: 255,
                  })}
                />

                {errors.description && (
                  <p style={{ color: "red" }}>
                    Description field is the required field
                  </p>
                )}
                {errors.description?.type === "maxLength" && (
                  <p style={{ color: "red" }}>
                    Description should be less than the 255 characters{" "}
                  </p>
                )}
              </Form.Group>
              <Form.Group>
                <Button
                  variant="primary"
                  onClick={handleSubmit(handleButtonClick)}
                >
                  Save
                </Button>
              </Form.Group>
            </form>
          </Modal.Body>
        </Modal>
        <h1>List of Recipes</h1>
        {recipes.map((recipe, index) => {
          return (
            <Recipe
              title={recipe.title}
              key={index}
              description={recipe.description}
              onClick={() => {
                showModal(recipe.id);
              }}
              onDelete={()=>{delteRecipe(recipe.id)}}
              
            />
          );
        })} 
      </div>
    </>
  );
};

const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="heading">Welcome to the recipes</h1>
      <Link to="/signup" className="btn btn-primary btn-lg">
        Get Started
      </Link>
    </div>
  );
};

function Home() {
  const [logged] = useAuth();
  return <>{logged ? <LoggedinHome /> : <LoggedOutHome />}</>;
}

export default Home;
