import { useContext, useState } from "react";
import { AuthContext } from "../store/authContext";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { user, fetchUser, myAxios, logout } = useContext(AuthContext);
  const [updateInfoLoading, setUpdateInfoLoading] = useState(false);
  const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);

  // Form state
  const [infoForm, setInfoForm] = useState({
    email: user.email || "",
    username: user.username || "",
    fullname: user.fullname || "",
    phone: user.phone || "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  //   Onchange functions
  const handleInfoChange = (e) => {
    setInfoForm({
      ...infoForm,
      [e.target.name]: e.target.value,
    });
  };
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  //   Onsubmit functions
  const updateInfo = (e) => {
    e.preventDefault();
    setUpdateInfoLoading(true);
    myAxios
      .patch("/api/auth/user", infoForm)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          fetchUser();
        }, 2000);
      })
      .catch((err) =>
        toast.error(err.response?.data.msg || "Something went wrong")
      )
      .finally(() => setUpdateInfoLoading(false));
  };
  const updatePassword = (e) => {
    e.preventDefault();
    setUpdatePasswordLoading(true);
    myAxios
      .patch("/api/auth/change-password", passwordForm)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          logout();
        }, 2000);
      })
      .catch((err) =>
        toast.error(err.response?.data.msg || "Something went wrong")
      )
      .finally(() => setUpdatePasswordLoading(false));
  };
  return (
    <div className="container py-3">
      <h2>Edit Profile</h2>
      <div className="row">
        <div className="col-md-8 m-auto">
          <form onSubmit={updateInfo} className="mb-5">
            <h3>Change Info</h3>
            <div className="form-group my-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={infoForm.email}
                onChange={handleInfoChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={infoForm.username}
                onChange={handleInfoChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                value={infoForm.fullname}
                onChange={handleInfoChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={infoForm.phone}
                onChange={handleInfoChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary mt-3">
                <i className="fa-solid fa-check me-2"></i>Save Changes
              </button>
            </div>
          </form>

          <form onSubmit={updatePassword} className="mb-5">
            <h3>Change Password</h3>
            <div className="form-group my-2">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                value={passwordForm.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your old password"
                required
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary mt-3">
                <i className="fa-solid fa-gear me-2"></i>Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
