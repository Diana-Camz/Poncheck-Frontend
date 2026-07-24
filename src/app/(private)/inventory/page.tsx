"use client";
import { useState } from "react";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import AppChip from "@/components/shared/app-chip";
import AppSelect from "@/components/shared/app-select";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { AppButton } from "@/components/shared/app-button";
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import { AppInput } from "@/components/shared/app-input";
import { LoadingState } from "@/components/shared/loading-state";

export default function Inventory() {
      const [amount, setAmount] = useState("");
          const [size, setSize] = useState("");
  return (
    <div>
      <div className="flex gap-4">
                    <ThemeToggle />
                    <AppButton variant="primary" size="lg" onClick={() => {}}>
                        Primary
                    </AppButton>
                    <AppButton variant="secondary" onClick={() => {}}>
                        Secondary
                    </AppButton>
                    <AppButton variant="outline" onClick={() => {}}>
                        Outline
                    </AppButton>
                    <AppButton variant="ghost" onClick={() => {}}>
                        Ghost
                    </AppButton>
                    <AppButton variant="destructive" onClick={() => {}}>
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
                        onChange={(value) => { }}
                        options={[{ value: 1, label: "Ponche" }, { value: 2, label: "Cafe" }, { value: 3, label: "Botana" }]}
                    />
                    <AppSelect
                        label="Movimiento"
                        value={amount}
                        onChange={(value) => {}}
                        options={[{ value: 20, label: "Deposito" }, { value: 30, label: "Compra" }, { value: 40, label: "Retiro" }]}
                    />
                </div>
                <div>
                    <LoadingState message="Cargando..." description="Por favor, espere mientras se carga la información." />
                </div>
    </div>
  )
}
