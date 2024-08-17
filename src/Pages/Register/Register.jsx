import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Register = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    createUserWithEmail,
    setUser,
    user,
    // updateUserProfile,
  } = useAuth();
  const onSubmit = (data) => {
    setSuccess("");
    setError("");
    // console.log(data);
    const { name, email, password, photoURL } = data;

    if (password.length < 6) {
      setError("Password must be longer than 6 characters!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password should have at least one uppercase character!");
      return;
    } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)) {
      setError("Password should have at least one spacial character!");
      return;
    }

    createUserWithEmail(email, password)
      .then((result) => {
        // console.log(result.user);
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          setUser({ ...result.user, displayName: name, photoURL });
          setSuccess("Registation successfull.");
          swal("Registation successfull.", {
            button: false,
          });
          reset();
          navigate(location.state ? location.state : "/");
        });
        setSuccess("Registation successfull.");
      })
      .catch((error) => {
        setError(error.message);
        swal(error.message, {
          button: false,
          icon: "error",
        });
      });
  };
  //   if (user) {
  //     navigate("/");
  //     return;
  //   }
  return (
    <section>
      <Helmet>
        <title>ROAM | Register</title>
      </Helmet>
      <section className="py-6 lg:bg-[#F3F3F3] px-5 md:px-0">
        <div className="mx-auto max-w-7xl"></div>
        <div className="min-h-[87vh] hero ">
          <div className=" w-full max-w-[500px] md:px-6 card rounded lg:bg-base-100 bg-[#F3F3F3]">
            <h3 className="text-[#403F3F] text-3xl font-semibold text-center pt-10">
              Register your account
            </h3>
            <hr className="w-5/6 mx-auto mt-10" />
            <form onSubmit={handleSubmit(onSubmit)} className="pb-0 card-body">
              <div className=" form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="rounded input-bordered input lg:bg-[#F3F3F3]"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="mt-2 text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className=" form-control">
                <label className="label">
                  <span className="label-text">Photo URL/(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  name="photoURL"
                  className="rounded input-bordered input lg:bg-[#F3F3F3]"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="mt-2 text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className=" form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
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

                <div className="flex gap-1 mt-3">
                  <input
                    type="checkbox"
                    name="terms"
                    {...register("terms", { required: true })}
                  />

                  <label htmlFor="terms">
                    <span>
                      Accept{" "}
                      <a
                        href="#terms"
                        className="text-pink-600 transition-all delay-100 hover:underline"
                      >
                        Term & Conditions
                      </a>
                    </span>
                  </label>
                </div>
                {errors.terms && (
                  <span className="mt-2 text-red-600">
                    Accept terms & conditions
                  </span>
                )}
              </div>
              {success && <p className="text-sm text-gray-700">{success}</p>}
              {error && <p className="text-sm text-red-700">{error}</p>}
              <div className="mt-2 form-control">
                <button className="text-white transition-all ease-in-out delay-100 bg-black btn-base">
                  Register
                </button>
              </div>
            </form>
            <div className="px-5 pb-5">
              {/* Social Login component */}
              <SocialLogin />
              <p className="my-3 text-center">
                Already have an account?{" "}
                <Link to={"/login"} className="text-black hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Register;
