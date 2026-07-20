"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { AppButton } from "@/components/shared/app-button";
import AppChip from "@/components/shared/app-chip";
import { AppInput } from "@/components/shared/app-input";
import AppSelect from "@/components/shared/app-select";
import { LoadingState } from "@/components/shared/loading-state";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useState } from "react";
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import type { Login } from "@/features/auth/schema/auth.schema";
import { loginSchema } from "@/features/auth/schema/auth.schema";
import { useLogin } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Signin() {
    const router = useRouter();
    const [size, setSize] = useState("");
    const [amount, setAmount] = useState("");

    const login = useLogin();
    const showLoader = login.isPending || login.isSuccess

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(data: Login) {
        try {
            await login.mutateAsync({ username: data.username, password: data.password });
            toast.success("Sesion iniciada");
        } catch {
            console.log(errors, login.error);
        }
    }

    return (
        <>
            {showLoader &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-backgroung">
                    <LoadingState 
                    message="Iniciando Sesion..."
                    fullPage={true}
                    />
                </div>
            }
            <div>
                <div className="flex gap-4">
                    <ThemeToggle />
                    <AppButton variant="primary" size="lg" onClick={() => console.log("Button clicked!")}>
                        Primary
                    </AppButton>
                    <AppButton variant="secondary" onClick={() => console.log("Button clicked!")}>
                        Secondary
                    </AppButton>
                    <AppButton variant="outline" onClick={() => console.log("Button clicked!")}>
                        Outline
                    </AppButton>
                    <AppButton variant="ghost" onClick={() => console.log("Button clicked!")}>
                        Ghost
                    </AppButton>
                    <AppButton variant="destructive" onClick={() => console.log("Button clicked!")}>
                        Destructive
                    </AppButton>
                </div>
                <div className="flex gap-4 w-1/2">
                    <AppInput label="Direccion" placeholder="Ingrese la dirección" />
                    <AppInput label="Telefono" placeholder="Ingrese el número de teléfono" />
                    {/* <div>
                    <AppBadge icon={<MailIcon />} variant="standard" badgeContent={5} />
                </div> */}

                </div>
                <div className="flex gap-4">
                    <AppChip icon={<FormatListBulletedAddIcon />} label="Pedido con detalles" size="small" />
                    <AppChip icon={<TimelapseIcon />} label="Excedido de tiempo" variant="outlined" />
                </div>
                <div>
                    <AppSelect
                        label="Categoria"
                        value={size}
                        onChange={(value) => { console.log("Selected value:", value); setSize(value); }}
                        options={[{ value: 1, label: "Ponche" }, { value: 2, label: "Cafe" }, { value: 3, label: "Botana" }]}
                    />
                    <AppSelect
                        label="Movimiento"
                        value={amount}
                        onChange={(value) => { console.log("Selected value:", value); setAmount(value); }}
                        options={[{ value: 20, label: "Deposito" }, { value: 30, label: "Compra" }, { value: 40, label: "Retiro" }]}
                    />
                </div>
                <div>
                    <LoadingState message="Cargando..." description="Por favor, espere mientras se carga la información." />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AppInput
                        label="Usuario"
                        placeholder="Ingrese el nombre de usuario"
                        {...register("username")}
                    />
                    <AppInput
                        label="Contrasena"
                        placeholder="Ingrese la contrasena"
                        {...register("password")}
                    />
                    <AppButton type="submit" variant="primary" size="lg" disabled={login.isPending}>
                        {login.isPending ? "Iniciando sesion..." : "Iniciar Sesion"}
                    </AppButton>
                </form>
            </div>
        </>
    );
}
