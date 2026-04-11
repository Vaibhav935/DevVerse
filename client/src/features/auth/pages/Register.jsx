import { useForm } from "react-hook-form";
import { ImGithub } from "react-icons/im";
import { Link, useNavigate } from "react-router";
import { registerApi } from "../../../services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = registerApi(data);
    if (res) {
      dispatch(setUser(res.data));
      reset();
      navigate("/code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Create your account
        </h2>

        <button className="w-full text-white flex items-center justify-center gap-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-lg py-2 mb-5 transition">
          <ImGithub /> Continue with GitHub
        </button>

        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 h-px bg-[#30363d]" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-[#30363d]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Username</label>
            <input
              {...register("username", { required: "Username required" })}
              className="w-full mt-1 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              {...register("email", { required: "Email required" })}
              className="w-full mt-1 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password required" })}
              className="w-full mt-1 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* 
          <div>
            <label className="text-gray-400 text-sm">Confirm Password</label>
            <input
              type="password"
              // {...register("confirmPassword", {
              //   required: "Confirm password",
              // })}
              className="w-full mt-1 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 text-white font-medium shadow-md">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
