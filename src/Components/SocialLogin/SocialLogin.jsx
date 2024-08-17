import { FaGithub, FaGoogle } from "react-icons/fa6";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithGithub } = useAuth();
  // console.log(signInWithGithub, signInWithGoogle);
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        swal("Login successfull.", {
          button: false,
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        swal(error.message, {
          button: false,
        });
      });
  };
  const handleGithubSignIn = () => {
    signInWithGithub()
      .then(() => {
        swal("Login successfull.", {
          button: false,
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        swal(error.message, {
          button: false,
        });
      });
  };
  return (
    <div className="mb-3 space-y-3">
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-full gap-2 px-4 py-2.5 font-medium text-xl bg-neutral-300 text-black"
      >
        <FaGoogle /> Continue With
      </button>
      <button
        onClick={handleGithubSignIn}
        className="flex items-center justify-center w-full gap-2 px-4 py-2.5 font-medium text-xl bg-neutral-300 text-black"
      >
        <FaGithub />
        Continue With
      </button>
    </div>
  );
};

export default SocialLogin;
