"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Typography,
    Box,
    Card,
    LinearProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";

// Schema di validazione con Yup
const schema = yup.object().shape({
    name: yup.string().min(3, "Minimo 3 caratteri").required("Nome obbligatorio"),
    email: yup.string().email("Email non valida").required("Email obbligatoria"),
    userType: yup.string().oneOf(["azienda", "cliente"], "Seleziona un'opzione").required("Tipo di utente obbligatorio"),
    termsAccepted: yup.boolean().oneOf([true], "Devi accettare i termini e condizioni").required(),
});

export default function AuthForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
    });

    const onSubmit = async (data: any) => {
        setLoading(true);

        // Simulazione di login
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem("userType", data.userType);

            if (data.userType === "azienda") {
                router.push("/dashboard/azienda");
            } else {
                router.push("/dashboard/cliente");
            }
        }, 2000);
    };

    return (
        <Card elevation={3} style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Accedi al Gestionale
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="Nome"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                />

                <FormControl component="fieldset" style={{ marginTop: "20px" }}>
                    <FormLabel component="legend">Seleziona il tipo di utente</FormLabel>
                    <RadioGroup row>
                        <FormControlLabel
                            value="azienda"
                            control={<Radio />}
                            label="Azienda"
                            {...register("userType")}
                        />
                        <FormControlLabel
                            value="cliente"
                            control={<Radio />}
                            label="Cliente"
                            {...register("userType")}
                        />
                    </RadioGroup>
                    <Typography color="error">{errors.userType?.message}</Typography>
                </FormControl>

                <FormControlLabel
                    control={<Checkbox {...register("termsAccepted")} />}
                    label="Accetto i termini e condizioni"
                />
                <Typography color="error">{errors.termsAccepted?.message}</Typography>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!isValid || loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    {loading ? "Accedi in corso..." : "Accedi"}
                </Button>

                {loading && <LinearProgress sx={{ mt: 2 }} />}
            </Box>
        </Card>
    );
}
