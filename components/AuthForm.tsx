import {AuthUser} from 'types/auth'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Stack, Button, TextField, Box } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

type Props = {
  handleSubmit: (data: AuthUser) => Promise<void>;
}

const schema = z.object({
  email: z.string().min(1, { message: "emailは必須項目" }).email({ message: "emailを入力" }),
  password: z.string().min(10, { message: "パスワードは10文字以上" }),
});

const AuthForm = (props: Props) => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<AuthUser> = (data: AuthUser) => {
    props.handleSubmit(data)
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack direction="column" spacing={2} alignItems="center">
        <TextField autoComplete="username" type="email" id="email" label="email" variant="outlined" {...register('email')} />
        {errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
        <TextField autoComplete="current-password" type="password" id="password" label="password" variant="outlined" {...register('password')} />
        {errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
        <Button type="submit" color="primary" variant="contained">送信</Button>
      </Stack>
    </Box>
  )
}

export default AuthForm