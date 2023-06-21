import {AuthUser} from 'types/auth'
import { Stack, Button, TextField, Box } from "@mui/material";

type Props = {
  account: AuthUser;
  setAccount: React.Dispatch<React.SetStateAction<AuthUser>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const AuthForm = (props: Props) => {

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setAccount((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };
  
  return (
    <Box component="form" onSubmit={props.handleSubmit} noValidate>
      <Stack direction="column" spacing={2} alignItems="center">
        <TextField autoComplete="username" type="email" id="email" name="email" label="e-mail" variant="outlined" value={props.account.email} onChange={handleAccount} />
        <TextField autoComplete="current-password" type="password" id="password" name="password" label="password" variant="outlined" value={props.account.password} onChange={handleAccount} />
        <Button type="submit" color="primary" variant="contained">送信</Button>
      </Stack>
    </Box>
  )
}

export default AuthForm