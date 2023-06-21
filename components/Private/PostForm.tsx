import {Post} from 'types/post'
import { Stack, Button, TextField, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, FormGroup, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

type Props = {
  props: { 
    post: Post; 
    setPost: React.Dispatch<React.SetStateAction<Post>>;
    onRegister: () => void;
  };
};

const Register = ({props}:Props) => {

  const releaseArray = ['公開', '非公開'];
  const categoryArray = ['カテゴリ１', 'カテゴリ２', 'カテゴリ３'];
  
  const handlePost = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPost((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleCategory = (event: SelectChangeEvent<string>) => {
    props.setPost(prevState => ({...prevState, [event.target.name]: event.target.value}));
  };

  const handleArticle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setPost(prevState => ({
      ...prevState, 
      article: event.target.value,
    }))
  }
  
  return (
    <div className="mb-3 p-2">
      <Stack direction="column" spacing={2}>

        <TextField
          id="title"
          name="title"
          label="タイトル"
          variant="outlined"
          onChange={handlePost}
          value={props.post.title}
        />
  
        <FormControl component="fieldset">
          <FormLabel component="legend" className="mr-3">公開設定</FormLabel>
          <RadioGroup name="release" value={props.post.release} onChange={handlePost} row>
            {releaseArray.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
                checked={props.post.release === option}
              />
            ))}
          </RadioGroup>
        </FormControl>
  
        <FormControl>
          <InputLabel id="category-label">カテゴリ</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={props.post.category}
            onChange={handleCategory}
          >
            {categoryArray.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <TextField
          id="article"
          name="article"
          label="記事"
          multiline
          minRows={4}
          placeholder="記事を入力してください"
          value={props.post.article}
          onChange={handleArticle}
        />

        <Button type="button" color="primary" variant="contained" onClick={props.onRegister}>更新</Button>
      </Stack>

    </div>
  )
}

export default Register