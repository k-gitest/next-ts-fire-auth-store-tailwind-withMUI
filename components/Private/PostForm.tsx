import {Post} from 'types/post'
import { Stack, Button, TextField, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, FormGroup, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText } from "@mui/material";
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

type Props = {
    post: Post; 
    onRegister: (data: Post) => Promise<void>;
};

const schema = z.object({
  title: z.string().max(50),
  release: z.string(),
  category: z.string(),
  article: z.string().max(1000),
});

const Register = ({post, onRegister}: Props) => {

  const releaseArray = ['公開', '非公開'];
  const categoryArray = ['カテゴリ１', 'カテゴリ２', 'カテゴリ３'];

  const { control, handleSubmit, formState: { errors }, } = useForm<Post>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Post> = (data) => {
    onRegister(data)
  }
  
  return (
    <div className="mb-3 p-2">
      <Stack direction="column" spacing={2}>

        <Controller
          name="title"
          control={control}
          defaultValue={post.title}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="title"
              label="タイトル"
              variant="outlined"
              error={fieldState.invalid}　　
              helperText={fieldState.error?.message}
            />
          )}
        />
        
        
        <Controller
          name="release"
          control={control}
          defaultValue={post.release}
          render={({ field, fieldState }) => (
            <FormControl component="fieldset" error={fieldState.invalid}>
              <FormLabel component="legend" className="mr-3">公開設定</FormLabel>
              <RadioGroup {...field} row>
                {releaseArray.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
  
        <Controller
          name="category"
          control={control}
          defaultValue={post.category}
          render={({ field, fieldState }) => (
            <FormControl error={fieldState.invalid}>
              <InputLabel id="category-label">カテゴリ</InputLabel>
              <Select
                {...field}
                labelId="category-label"
                id="category"
                onChange={(e: SelectChangeEvent<string>) => field.onChange(e.target.value)}
              >
                {categoryArray.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
  
        <Controller
          name="article"
          control={control}
          defaultValue={post.article}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="article"
              name="article"
              label="記事"
              multiline
              minRows={4}
              placeholder="記事を入力してください"
              error={fieldState.invalid}　　
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>更新</Button>
      </Stack>

    </div>
  )
}

export default Register