import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Heading, Text, TextInput } from "@ignite-ui/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Container, Form, FormError, Header } from "./style"

export default function Login(){
    const loginFormSchema = z.object({
        email: z
            .string()
            .min(1, "Informe o e-mail para logar."),
            
        senha: z
            .string()
            .min(6, 'A senha precisa ter 6 caracteres.')
        
    })

    

    type loginFormData = z.infer<typeof loginFormSchema>

    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }} = useForm<loginFormData>({
            resolver: zodResolver(loginFormSchema)
        })

    async function loginHandle(data : loginFormData){
        console.log(data)
    }

    return(
        <Container>
            <Header>
                <Heading as="strong">Bem-Vindo ao Sistema</Heading>
                <Text>
                    Vamos acessar o sistema.
                </Text>
            </Header>

            <Form as="form" onSubmit={handleSubmit(loginHandle)}>
                 <label>
                    <Text size="sm">E-mail</Text>
                    <TextInput placeholder="e-mail" {...register('email')}/>
                    {errors.email && (
                        <FormError size="sm">{errors.email.message}</FormError>
                    )}
                 </label>

                 <label>
                    <Text size="sm">Senha</Text>
                    <TextInput placeholder="Senha" {...register('senha')}/>
                    {errors.senha && (
                        <FormError size="sm">{errors.senha.message}</FormError>
                    )}
                 </label>

                 <Button type="submit" disabled={isSubmitting}>Logar</Button>
            </Form>
        </Container>
    )
}