import styles from './styles.module.sass'
import Input from 'antd/lib/input'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function MenuChats(props: any) {
  const { chats, setChatSelected, chatSelected } = props
  const [persquisaInput, setPesquisaInput] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)

  const entrarNoChat = (chat:any) => {
    setChatSelected(chat)
  }

  const criarNovoChat = () => {
    console.log('criar novo chat')
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  return (
    <div id={styles.menuChatContainer}>
      <div id={styles.headerMenuChat}>
        <div id={styles.headerUser}>
          <img src="perfil.jpg" alt="foto de perfil" className={styles.fotoPerfil}/>
          <div>
            <Tooltip title="Criar novo chat">
              <IconButton style={{color: "#90caf9"}} size="large" color="primary" onClick={()=>{
                handleOpenModal()
              }}>
                <AddIcon style={{fontSize:"30px"}}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Mais opçoes">
              <IconButton style={{color: "#90caf9"}} size="large" color="primary">
                <MoreVertIcon style={{fontSize:"30px"}}/>
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div id={styles.buscaContainer}>
          <Input
            placeholder="Pesquisar Chat"
            prefix={<SearchOutlined style={{color: "#8696a0"}}/>}
            style={{ backgroundColor: '#222e35' }}
            size="large"
            id={styles.inputBusca}
            bordered={false}
            onChange={(e) => setPesquisaInput(e.target.value)}
          />
        </div>
      </div>
      <div id={styles.chats}>
        {chats.map((chat:any) => (
          <div key={chat.id} className={styles.chat} onClick={()=>{entrarNoChat(chat)}} style={chat.id == chatSelected?{backgroundColor:"#2a3942"}:{}}>
            <img src={chat.image} alt="foto de perfil" className={styles.fotoPerfil}/>
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>
                {chat.name}
              </div>
              <div className={styles.chatMessage}>
                {chat.message.length ? chat.message[chat.message.length - 1].text: 'Sem mensagens'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const modalCreateChat = (props: any) => {
  return (
    <div>
      <h1>Modal</h1>
    </div>
  )
}