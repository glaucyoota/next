import { zodResolver } from '@hookform/resolvers/zod'
import { Heading, Text, TextInput, Button } from "@ignite-ui/react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Form, FormError, Header } from "./style";

export default function Register(){

    const registerFormSchema = z.object({
        Nome: z
            .string()
            .min(1, "Informe o Nome para cadastro."),
            
        Cpf: z
            .string()
            .min(11, 'Informe o cpf para cadastro.')
            .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
            .transform((cpf) => cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'))

    })

    

    type registerFormData = z.infer<typeof registerFormSchema>

    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }} = useForm<registerFormData>({
            resolver: zodResolver(registerFormSchema)
        })

    async function registerHandle(data : registerFormData){
        console.log(data)
    }

    return(
        <Container>
            <Header>
                <Heading as="strong">Bem-Vindo ao Sistema</Heading>
                <Text>
                    Informe os seus dados para criar o cadastro.
                </Text>
            </Header>

            <Form as="form" onSubmit={handleSubmit(registerHandle)}>
                 <label>
                    <Text size="sm">Nome</Text>
                    <TextInput placeholder="Nome" {...register('Nome')}/>
                    {errors.Nome && (
                        <FormError size="sm">{errors.Nome.message}</FormError>
                    )}
                 </label>

                 <label>
                    <Text size="sm">CPF</Text>
                    <TextInput placeholder="CPF" {...register('Cpf')}/>
                    {errors.Cpf && (
                        <FormError size="sm">{errors.Cpf.message}</FormError>
                    )}
                 </label>

                 <Button type="submit" disabled={isSubmitting}>Registrar</Button>
            </Form>
        </Container>
    )
}