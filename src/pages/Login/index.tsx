import { useForm } from "react-hook-form";
import { LuLogIn } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";
import Card from "../../components/Card";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    toast.success("Inicio de sesión exitoso 🚀");
    console.log("Datos login:", data);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card
        title="Iniciar Sesión"
        subtitle="Accede a tu cuenta para continuar"
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-4"
        >
          <div>
            <label className="block">Correo Electrónico</label>
            <input
              type="email"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="usuario@ejemplo.com"
              {...register("email")}
            />
          </div>
          <div>
            <label className="block">Contraseña</label>
            <input
              type="password"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="********"
              {...register("password")}
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" /> Recuérdame
            </label>
            <button
              type="button"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white w-full font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2"
            >
              <LuLogIn className="text-xl" />
              Entrar
            </button>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Regístrate aquí
          </a>
        </p>
      </Card>
    </section>
  );
}
