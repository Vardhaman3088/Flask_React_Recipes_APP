import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login} from "../auth";
import { useAuth } from "../auth";
function Login() {
  const {register,handleSubmit,reset, watch,formState: { errors },} = useForm();

  const navigate = useNavigate()

  // console.log(watch("username"));
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const [logged] = useAuth();
  const submitLogin = (data) => {
    console.log(data)
    reset(); 
    // const requestOptions = {
    //   method :"POST",
    //   headers:"Content-Type:application/json",
    //   body:JSON.stringify(data)
    // }
    
    // console.log(username);
    // console.log(password);
    // console.log(watch("username"));

    fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),   // It is equivalent to the body: JSON.stringify({ username:username, password:password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.access_token)
        console.log(logged)
        login(data.access_token)
        console.log(logged)
        navigate('/')
        
  });

    //   setUsername('')
    //   setPassword('')
  };
  return (
    <div className="login">
      <form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Username"
            // value={username}
            // name="username"
            // onChange={(e) => {
            //   setUsername(e.target.value);
            // }}
            {...register("username", { required: true, maxLength: 25 })}
            // {...register('username',{required:true, maxLength:25})}
          ></Form.Control>

          {errors.username && (
            <span style={{ color: "red" }}>Username is required</span>
          )}
          {errors.username?.type === "maxLength" && (
            <span style={{ color: "red" }}>Username should be less than 25</span>
          )}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your Password"
            // value={password}
            // name="password"
            // onChange={(e) => setPassword(e.target.value)}
            {...register("password", { required: true, minLength: 8 })}
          ></Form.Control>
        </Form.Group>
        {errors.password && (
          <p style={{ color: "red" }}>
            <small>Password is required</small>{" "}
          </p>
        )}
         {errors.password?.type === "minLength" && (
            <span style={{ color: "red" }}>Password should be more than 8 characters </span>
          )}

        <br />
        <Form.Group>
          <Button as="sub" variant="primary" onClick={handleSubmit(submitLogin)}>
            Login
          </Button>
        </Form.Group>
        <Form.Group>
          <small>
            Do not have an account? <Link to="/signup">Login</Link>
          </small>
        </Form.Group>
      </form>
    </div>
  );
}

export default Login;
