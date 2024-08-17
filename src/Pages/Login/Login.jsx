import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const { signInWithEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location?.state);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data) => {
    // console.log(data);
    const { email, password } = data;
    signInWithEmail(email, password)
      .then(() => {
        swal("Login successfull.", {
          button: false,
        });
        reset();
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        swal(error.message, {
          button: false,
          icon: "error",
        });
      });
  };
  return (
    <section>
      <Helmet>
        <title>Prodify | Login</title>
      </Helmet>
      <div className="py-6 px-5 md:px-0 lg:bg-[#F3F3F3]">
        <div className="mx-auto max-w-7xl"></div>
        <div className="min-h-[87vh] hero ">
          <div className=" w-full max-w-[500px] md:px-6 card rounded lg:bg-base-100 bg-[#F3F3F3]">
            <h3 className="text-[#403F3F] text-3xl font-semibold text-center pt-10">
              Login your account
            </h3>
            <hr className="w-5/6 mx-auto mt-10" />
            <form onSubmit={handleSubmit(onSubmit)} className="pb-0 card-body">
              <div className=" form-control">
                <label className="label">
                  <span className="label-text">Email address</span>
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  className="rounded input-bordered input lg:bg-[#F3F3F3]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="mt-2 text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    className="input rounded input-bordered w-full lg:bg-[#F3F3F3]"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="mt-2 text-red-600">
                      This field is required
                    </span>
                  )}
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-4 right-3"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
              </div>

              <div className="mt-2 form-control">
                <button className="text-white transition-all ease-in-out delay-100 btn-base bg-black">
                  Login
                </button>
              </div>
              <p className="my-3 text-center">
                {`Don't have any account? `}
                <Link
                  to={"/register"}
                  className="text-black font-medium hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
            <div className="px-5 pb-5">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
