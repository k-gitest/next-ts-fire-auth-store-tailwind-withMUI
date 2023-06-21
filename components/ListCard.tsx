import {useState, useEffect} from 'react'
import {Post} from 'types/post'
import {timeChange} from 'lib/dateConverter'

type Props = {
  list:Post;
  children?: React.ReactNode;
}

const ListCard = (props: Props) => {
  const [time, setTime] = useState('')

  useEffect(()=>{
    if (props.list.createdAt) {
      const res = timeChange(props.list.createdAt.seconds);
      setTime(res)
    }
  },[])
  
  return(
    <div className="mb-2 mx-2 border">
      <p>{props.list.title}</p>
      <p>{props.list.category}</p>
      <p>{props.list.release}</p>
      <p>{time}</p>
      {props.children && (
        <div>{props.children}</div>
      )}
    </div>
  )
}

export default ListCard