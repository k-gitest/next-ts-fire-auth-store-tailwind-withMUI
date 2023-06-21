const timeChange = (time: number) => {
  const date = new Date(time * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  const timeStamp = `${year}年${month}月${day}日${hour}時${min}分${sec}秒`
  return timeStamp
}

export {timeChange}