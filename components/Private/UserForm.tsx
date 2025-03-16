import {User} from 'types/user'
import { Stack, Button, TextField, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, FormGroup, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { SubmitHandler, useForm, Controller, FieldValues } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

type Props = {
    user: User;
    onRegister: (data: User) => Promise<void>;
};

const schema = z.object({
  name: z.string().max(50),
  email: z.string().email({ message: "emailを入力" }),
  address: z.string().max(150),
  gender: z.string(),
  hobby: z.array(z.string()),
  selectValue: z.string(),
  comment: z.string().max(300),
});

const Register = ({ user, onRegister }: Props) => {
  const genderArray = ['男性', '女性'];
  const hobbyArray = ['読書', '音楽', 'スポーツ'];
  const selectArray = ['hoge1', 'hoge2', 'hoge3'];
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: user || {},
  });

  
  const onSubmit: SubmitHandler<User> = (data) => {
    onRegister(data)
  }
  
  return (
    <div className="mb-3 p-2">
      <Stack direction="column" spacing={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="name"
              label="name"
              variant="outlined"
              error={Boolean(errors?.name)}
              helperText={errors?.name?.message}
            />
          )}
        />
        
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="address"
              label="address"
              variant="outlined"
            />
          )}
        />
        
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="email"
              label="e-mail"
              variant="outlined"
            />
          )}
        />
        

        <Controller
          name="gender"
          control={control}
          defaultValue={user.gender}
          render={({ field }) => (
            <RadioGroup {...field} row>
              {genderArray.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                  labelPlacement="end"
                />
              ))}
            </RadioGroup>
          )}
        />
        {errors.gender && <span>{errors.gender.message}</span>}
        
        <Controller
          name="hobby"
          control={control}
          render={({ field }) => (
            <FormControl component="fieldset">
              <FormLabel component="legend">趣味</FormLabel>
              <FormGroup row>
                {hobbyArray.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        {...field}
                        value={option}
                        checked={field.value ? field.value.includes(option) : false}
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
            </FormControl>
          )}
        />
        {errors.hobby && <span>{errors.hobby.message}</span>}
        
        <Controller
          name="selectValue"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="select-label">選択</InputLabel>
              <Select
                {...field}
                labelId="select-label"
                id="selectValue"
                onChange={(e: SelectChangeEvent<string>) => field.onChange(e.target.value)}
              >
                {selectArray.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {errors.selectValue && <span>{errors.selectValue.message}</span>}
        
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="comment"
              name="comment"
              label="コメント"
              multiline
              minRows={4}
            />
          )}
        />
        {errors.comment && <span>{errors.comment.message}</span>}
        
        <Button type="submit" color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>更新</Button>
        
      </Stack>
    </div>
  )
}

export default Register