type Props = {
  showModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = (props: Props) => {
  const {showModal, setModal, children} = props
  const closeModal = () => {
    setModal(false);
  };
  return(
    showModal ? 
      (
        <div className="flex fixed bg-gray-500/50 top-0 left-0 h-screen w-screen justify-center items-center ">
          <div className="w-1/2 h-1/2 bg-white p-5 rounded h-screen w-screen overflow-auto ">
            <p>モーダルウィンドウ</p>
            <p>コンテンツ</p>
            <div>{children}</div>
            <button onClick={closeModal} className="bg-red-500 rounded p-3">閉じる</button>
          </div>
        </div>
      )
      : null
  )
}

export default Modal