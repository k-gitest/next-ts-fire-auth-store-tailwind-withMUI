import {User} from 'types/user'
import { Stack, Button, TextField, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, FormGroup, InputLabel, Select, MenuItem, TextareaAutosize, SelectChangeEvent } from "@mui/material";

type Props = {
  props: { 
    user: User; 
    setUser: React.Dispatch<React.SetStateAction<User>>;
    onRegister: () => void;
  };
};

const Register = ({props}:Props) => {
  const genderArray = ['男性', '女性'];
  const hobbyArray = ['読書', '音楽', 'スポーツ'];
  const selectArray = ['hoge1', 'hoge2', 'hoge3'];
  
  const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setUser((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleHobby = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    props.setUser(prevState => ({
      ...prevState,
      hobby: checked ? [...prevState.hobby, value] : prevState.hobby.filter(h => h !== value)
    }));
  };

  const handleSelect = (event: SelectChangeEvent<string>) => {
    props.setUser(prevState => ({...prevState, [event.target.name]: event.target.value}));
  };

  const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setUser(prevState => ({
      ...prevState, 
      comment: event.target.value,
    }))
  }
  
  return (
    <div className="mb-3 p-2">
      <Stack direction="column" spacing={2}>
        <TextField id="name" name="name" label="name" variant="outlined" value={props.user.name} onChange={handleUser} />
        <TextField id="address" name="address" label="address" variant="outlined" value={props.user.address} onChange={handleUser} />
        <TextField id="email" name="email" label="e-mail" variant="outlined" value={props.user.email} onChange={handleUser} />
        
        <FormControl component="fieldset">
          <FormLabel component="legend">性別</FormLabel>
          <RadioGroup name="gender" value={props.user.gender} onChange={handleUser} row>
            {genderArray.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
                checked={props.user.gender === option}
                labelPlacement="end"
              />
            ))}
          </RadioGroup>
        </FormControl>
  
        <FormControl component="fieldset">
          <FormLabel component="legend">趣味</FormLabel>
          <FormGroup row>
            {hobbyArray.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    name="hobby"
                    value={option}
                    checked={props.user.hobby.includes(option)}
                    onChange={handleHobby}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </FormControl>
  
        <FormControl fullWidth>
          <InputLabel id="select-label">選択</InputLabel>
          <Select
            labelId="select-label"
            id="selectValue"
            name="selectValue"
            value={props.user.selectValue}
            onChange={handleSelect}
          >
            {selectArray.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          id="comment"
          name="comment"
          label="コメント"
          multiline
          minRows={4}
          value={props.user.comment}
          onChange={handleComment}
        />
        <Button type="button" color="primary" variant="contained" onClick={props.onRegister}>更新</Button>
      </Stack>

    </div>
  )
}

export default Register