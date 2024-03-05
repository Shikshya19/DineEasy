import { useState } from "react";
import backgroundImg from "../assets/backgrounds/restaurant-background.jpg";
const URL = 'http://localhost:8000/api/auth/register';
export default function Register() {
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
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
                alert("Registration successful");
              setUser({
                fullname: "",
                username: "",
                email: "",
                phone: "",
                password: "",
              });
              window.location.href = "/login";
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
            <h2 className="text-center my-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input name="fullname" onChange={handleChange} value={user.fullname} type="text" className="form-control" id="floatingInput" placeholder="Full Name" />
                    <label for="floatingInput">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="username" onChange={handleChange} value={user.username} type="text" className="form-control" id="floatingInput" placeholder="your_username" />
                    <label for="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="email" onChange={handleChange} value={user.email} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="phone" onChange={handleChange} value={user.phone} type="tel" className="form-control" id="floatingInput" placeholder="98xxxxxxxx" />
                    <label for="floatingInput">Phone</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="password" onChange={handleChange} value={user.password} type="password" className="form-control" id="floatingInput" placeholder="your_password" />
                    <label for="floatingInput">Password</label>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button type="submit" role="button" className="btn w-100">Register</button>
                </div>
            </form>
        </div>
    </div>
}   