import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    //   fetch("/auth/signup",{
    //       method:"POST",
    //       headers:{
    //           "Content-Type":"application/json"
    //       },
    //       body:JSON.stringify({username,email,password})
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))

    console.log(data);
    // setUsername(data.username)
    // setEmail(data.email)
    // setPassword(data.password)
    if (data.password === data.confirmPassword) {
      fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      })
        .then((res) => res.json())
        .then((ans) => {
          console.log(ans.message);
          setServerResponse(ans.message);
          console.log(serverResponse);
          setShow(true);
        })
        .catch((err) => console.log(err));
      reset();
    } else {
      alert("password and confirm password should be same");
    }
  };
  console.log(watch("username"));
  console.log(watch("email"));
  console.log(watch("password"));
  console.log(watch("confirmPassword"));
  return (
    <div className="container">
      {show ? (
        <>
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <p> {serverResponse} </p>
          </Alert>
          <h1>Sign up page</h1>
        </>
      ) : (
        <h1>Sign up page</h1>
      )}
      <div className="form">
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
            ></Form.Control>
            {errors.username && (
              <span style={{ color: "red" }}>Username is required</span>
            )}
            <br />
            {errors.username?.type === "maxLength" && (
              <span style={{ color: "red" }}> Max characters should be 25</span>
            )}
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your Email"
              // value={email}
              // name="email"
              // onChange={(e) => setEmail(e.target.value)}
              {...register("email", { required: true, maxLength: 80 })}
            ></Form.Control>
            {errors.email && (
              <span style={{ color: "red" }}>Email is required</span>
            )}
            <br />
            {errors.email?.type === "maxLength" && (
              <span style={{ color: "red" }}> Max characters should be 80</span>
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
            {errors.password && (
              <span style={{ color: "red" }}>Password is required</span>
            )}
            <br />
            {errors.password?.type === "minLength" && (
              <span style={{ color: "red" }}> Min characters should be 8</span>
            )}
          </Form.Group>
          <br />

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm  Password"
              // value={confirmPassword}
              // name="confirmPassword"
              // onChange={(e) => setConfirmPassword(e.target.value)}
              {...register("confirmPassword", { required: true, minLength: 8 })}
            ></Form.Control>
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>Confirm Password is required</span>
            )}
            <br />
            {errors.confirmPassword?.type === "minLength" && (
              <span style={{ color: "red" }}> Min characters should be 8</span>
            )}
          </Form.Group>
          <br />
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              onClick={handleSubmit(submitForm)}
            >
              SignUp
            </Button>
          </Form.Group>
          <Form.Group>
            <small>
              Already have an account? <Link to="/login">SignUp</Link>
            </small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
