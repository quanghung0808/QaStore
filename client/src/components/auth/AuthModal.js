import { Modal } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const AuthModal = ({ modal, setModal }) => {
  const { setShowToast } = useContext(AuthContext);

  document.querySelectorAll(".ant-modal-footer").forEach(function (a) {
    a.remove();
  });
  const handleOk = () => {
    setModal(false);
  };
  const handleCancel = () => {
    setModal(false);
  };
  const { loginUser, registerUser } = useContext(AuthContext);

  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { lusername, lpassword } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    try {
      event.preventDefault();
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        await setShowToast({
          show: true,
          message: "Login Successfully",
          type: "success",
        });
        handleOk();
      }

      if (!loginData.success) {
        await setShowToast({
          show: true,
          message: "Incorrect username or password",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //local state
  const [registerForm, setRegisterForm] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    yob: "",
  });

  const { fullname, username, password, confirmPassword, yob } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        await setShowToast({
          show: true,
          message: "Password do not match",
          type: "error",
        });
        setRegisterForm({
          ...registerForm,
          confirmPassword: "",
        });
      } else {
        const registerData = await registerUser(registerForm);
        console.log(registerData);
        if (registerData.success) {
          await setShowToast({
            show: true,
            message: registerData.message,
            type: "success",
          });
          handleOk();
        }
        if (!registerData.success) {
          await setShowToast({
            show: true,
            message: registerData.message,
            type: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [create, setCreate] = useState(false);
  return (
    <>
      <Modal open={modal} onCancel={handleCancel}>
        <div class="modal-dialog modal-lg">
          <div class="modal-content modal-popup">
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="modal-title">
                      <h2 className="text-red-600">QA MOBILE</h2>
                    </div>

                    <ul class="nav nav-tabs" role="tablist">
                      <li class={`${create === false ? "active" : ""}`}>
                        <a
                          href="#sign_in"
                          aria-controls="sign_in"
                          role="tab"
                          data-toggle="tab"
                          onClick={() => {
                            setCreate(false);
                          }}
                        >
                          Sign In
                        </a>
                      </li>

                      <li class={`${create === true ? "active" : ""}`}>
                        <a
                          href="#sign_up"
                          aria-controls="sign_up"
                          role="tab"
                          data-toggle="tab"
                          onClick={() => {
                            setCreate(true);
                          }}
                        >
                          Create an account
                        </a>
                      </li>
                    </ul>

                    <div class="tab-content">
                      <div
                        role="tabpanel"
                        class={`tab-pane fade in ${
                          create === false ? "active" : ""
                        }`}
                        id="sign_in"
                      >
                        <form onSubmit={login}>
                          <input
                            type="text"
                            class="form-control"
                            name="username"
                            placeholder="Username"
                            required
                            value={lusername}
                            onChange={onChangeLoginForm}
                          />
                          <input
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Password"
                            required
                            value={lpassword}
                            onChange={onChangeLoginForm}
                          />
                          <input
                            type="submit"
                            class="form-control"
                            name="submit"
                            value="Sign in"
                          />
                        </form>
                      </div>
                      <div
                        role="tabpanel"
                        class={`tab-pane fade in ${
                          create === true ? "active" : ""
                        }`}
                        id="sign_up"
                      >
                        <form onSubmit={register}>
                          <input
                            type="text"
                            class="form-control"
                            name="fullname"
                            placeholder="Full Name"
                            required
                            maxLength={40}
                            value={fullname}
                            onChange={onChangeRegisterForm}
                          />
                          <input
                            type="text"
                            class="form-control"
                            name="username"
                            placeholder="Username"
                            minLength={8}
                            maxLength={30}
                            required
                            value={username}
                            onChange={onChangeRegisterForm}
                          />
                          <input
                            type="date"
                            class="form-control"
                            name="yob"
                            placeholder="Date of birth"
                            required
                            min="1970-01-01" // minimum date
                            max="2015-01-01"
                            value={yob}
                            onChange={onChangeRegisterForm}
                          />
                          <input
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Password"
                            required
                            pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
                            minLength={8}
                            maxLength={30}
                            title="Password must be at least 1 number and 1 character"
                            value={password}
                            onChange={onChangeRegisterForm}
                          />
                          <input
                            type="password"
                            class="form-control"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            required
                            pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
                            minLength={8}
                            maxLength={30}
                            value={confirmPassword}
                            title="Password must be at least 1 number and 1 character"
                            onChange={onChangeRegisterForm}
                          />
                          <input
                            type="submit"
                            class="form-control"
                            name="submit"
                            value="Sign up"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AuthModal;
