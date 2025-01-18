import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/features/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Button } from "antd";

import { useForm } from "react-hook-form";

const Login = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");

  const { register, handleSubmit } = useForm<FormData>({});
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();

  console.log(error);

  interface FormData {
    email: string;
    password: string;
  }
  const onSubmit = async (info: FormData) => {
    const userInfo = {
      email: info.email,
      password: info.password,
    };
    // const res = await login(userInfo).unwrap();
    // dispatch(setUser({ user: {}, token: res.data.accessToken }));
    try {
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken);
      console.log(user);
      dispatch(setUser({ user: user, token: res.data.accessToken })); //setting user to redux
    } catch (error) {
      console.error("Login failed", error); // Handle login errors (show a message)
    }
  };

  return (
    <div className="px-24 mt-20">
      <h2 className="text-4xl font-semiBold text-center py-5">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <Button htmlType="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
