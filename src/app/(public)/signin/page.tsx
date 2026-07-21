"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { LoadingState } from "@/components/shared/loading-state";
import type { Login } from "@/features/auth/schema/auth.schema";
import { loginSchema } from "@/features/auth/schema/auth.schema";
import { useLogin } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Header } from "./components/header";

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const login = useLogin();
    const showLoader = login.isSuccess

    const {
        register,
        handleSubmit,
        formState: { errors },
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
        } catch {
            toast.error("Error al iniciar sesion, por favor intenta de nuevo.")
        }
    }

    return (
        <>
            {showLoader &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
                    <LoadingState
                        message="Iniciando Sesion..."
                        fullPage={true}
                    />
                </div>
            }
            <Header />
            <div className="box-border flex min-h-svh w-full items-center justify-center px-4 py-8 pt-20 sm:px-6 md:px-10 md:pb-10">
                <Card className="w-full max-w-5xl gap-0 overflow-hidden p-0 shadow-lg md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
                    <div className="relative min-h-56 w-full bg-muted md:min-h-[520px]">
                        <Image
                            src={"/images/banner.jpeg"}
                            alt="banner"
                            fill
                            priority
                            className="object-cover"
                            sizes="(min-width: 768px) 58vw, 100vw"
                        />
                    </div>
                    <div className="flex items-center justify-center px-5 py-8 sm:px-8 md:px-10 bg-background-2">
                        <div className="flex flex-col w-full max-w-sm md:gap-7">
                            <CardHeader className="items-center px-0 text-center">
                                <CardTitle className="text-2xl font-semibold">Bienvenido</CardTitle>
                                <CardDescription className="text-balance">
                                    Ingresa tu usuario y contrasena
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-0">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FieldGroup className="gap-1">
                                        <AppInput
                                            label="Usuario"
                                            errorMessage={errors.username?.message}
                                            {...register("username")}
                                        />
                                        <AppInput
                                            label="Contrasena"
                                            errorMessage={errors.password?.message}
                                            type={showPassword ? "text" : "password"}
                                            rightIcon={
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((value) => !value)}
                                                    className="text-muted-foreground hover:text-foreground"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="size-4" />
                                                    ) : (
                                                        <Eye className="size-4" />
                                                    )}
                                                </button>
                                            }
                                            {...register("password")}
                                        />
                                    </FieldGroup>
                                    <FieldGroup className="mt-7">
                                        <AppButton type="submit" variant="primary" size="lg" disabled={login.isPending} isLoading={login.isPending}>
                                            {"Iniciar Sesion"}
                                        </AppButton>
                                    </FieldGroup>

                                </form>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}
