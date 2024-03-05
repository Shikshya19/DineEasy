import { useState } from "react";
import backgroundImg from "../assets/backgrounds/restaurant-background.jpg";
const URL = 'http://localhost:8000/api/auth/login';
export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(user),
            });
            console.log(response);
            if (response.ok) {
                alert("Login successful")
              setUser({
                email: "",
                password: "",
              });
              navigate("/login");
            } else {
                alert("Login failed")

            }
          } catch (error) {
            console.log(error.data);
          }
    }
    const handleChange = (e) => {
        setUser({...user, 
            [e.target.name]: e.target.value
        })
    }

    return <div className="container d-flex flex-column align-items-center">
            <img src={backgroundImg} alt="Restaurant" className="img-fluid position-absolute"/>
        <div className="m-4 form-container py-2 px-3 rounded-3 position-relative">
            <h2 className="text-center my-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input name="email" onChange={handleChange} value={user.email} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="password" onChange={handleChange} value={user.password} type="password" className="form-control" id="floatingInput" placeholder="your_password" />
                    <label for="floatingInput">Password</label>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button type="submit" role="button" className="btn w-100">Login</button>
                </div>
            </form>
        </div>
    </div>
}