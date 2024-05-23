import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useRef, useState } from "react";
import heroImg from "../../../assets/others/authentication2.png";
import bgImg from "../../../assets/others/authentication.png";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Login = () => {
  const { logIn, loading, setLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const captchaRef = useRef("");
  const [captchaValidate, setCaptchaValidate] = useState(false);
  const redirect =
    location.state?.from?.pathname + location.state?.from?.search || "/";

  useEffect(() => {
    loadCaptchaEnginge(6, "rgb(209 160 84 / 0.7)", "white");
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const passoword = form.password.value;
    // console.log({ email, passowrd });
    try {
      const loginResponse = await logIn(email, passoword);
      // const userInfo = {
      //   name: "Unknown",
      //   email: loginResponse.user.email,
      //   uid: loginResponse.user.uid,
      // };
      // const storeUserInfoResponse = await axiosPublic.post("user", userInfo);
      // if (storeUserInfoResponse.data.insertedId) {
      form.reset();
      toast.success("Signin successful");
      navigate(redirect);
      // }
    } catch (error) {
      setLoading(false);
      console.log("error >> ", error);
      toast.error("Error! Try again");
    }
  };

  return (
    <div
      className="hero min-h-dvh font-inter"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div
        className="hero-content flex-col lg:flex-row w-full items-center"
        style={{ boxShadow: "10px 10px 10px 10px rgba(0,0,0,0.25)" }}
      >
        <img src={heroImg} className="" />
        <form onSubmit={handleForm} className="card-body max-w-[536px]">
          <h1 className="text-dark-001 text-[40px] font-bold text-center">
            Login
          </h1>
          {/* email */}
          <div className="form-control">
            <label className="label px-0">
              <span className="text-xl text-dark-002 font-semibold">Email</span>
            </label>
            <input
              autoComplete="username"
              name="email"
              type="email"
              placeholder="enter your email"
              className="input input-bordered placeholder:text-dark-1a1"
              required
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label px-0">
              <span className="text-xl text-dark-002 font-semibold">
                Password
              </span>
            </label>
            <input
              autoComplete="current-password"
              name="password"
              type="password"
              placeholder="enter your password"
              className="input input-bordered placeholder:text-dark-1a1"
              required
            />
            <label className="label">
              {/* <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a> */}
            </label>
          </div>

          {/* captcha */}
          <div className="form-control flex">
            <label className="label px-0">
              <span className="text-xl text-dark-002 font-semibold">
                Captcha
              </span>
            </label>
            <div className="flex justify-between items-center gap-6">
              <input
                ref={captchaRef}
                type="text"
                placeholder="enter captcha"
                className="input input-bordered placeholder:text-dark-1a1"
                required
                disabled={captchaValidate}
                readOnly={captchaValidate}
              />
              <div className="flex items-center">
                {captchaValidate || (
                  <LoadCanvasTemplate
                    reloadText="Reload"
                    reloadColor="#BB8506"
                  />
                )}
                <button
                  disabled={captchaValidate}
                  onClick={() => {
                    validateCaptcha(captchaRef.current.value, false)
                      ? setCaptchaValidate(
                          validateCaptcha(captchaRef.current.value, false)
                        )
                      : toast.warn("Incorrect Captcha");
                  }}
                  type="button"
                  className=""
                >
                  {captchaValidate ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-10 text-gold-054/70"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-10 text-gold-054/70 animate-bounce"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* signin btn */}
          <div className="form-control mt-6">
            <button
              disabled={!captchaValidate || loading}
              type="submit"
              className="btn bg-gold-054/70 hover:bg-gold-054 text-white text-xl font-bold disabled:bg-gold-054/50"
            >
              Sign In
              {loading && (
                <span className="loading loading-dots loading-md"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
