import { IconButton, Tooltip } from '@mui/material'
import Input from 'antd/lib/input'
import styles from './styles.module.sass'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Send } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';


export default function Chat(props: any) {
  const { chat } = props
  const [enviarInput, setEnviarInput] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adicionarMembro = () => {
    console.log(chat)
    axios.put(`http://localhost:3333/api/chats/${chat.id}/newmember`, {
      id: 4
    })
  }

  const removerMembro = () => {
    axios.put(`http://localhost:3333/api/chats/${chat.id}/removemember`, {
      id: 4
    })
  }
    return (
    <div id={styles.chatContainer}>
      <div id={styles.headerChat}>
        <div id={styles.chatInfo}>
          <img src={chat.image} alt="foto de perfil" id={styles.fotoChat} />
          <div id={styles.chatDados}>
            <div id={styles.chatName}>
              {chat.name}
            </div>
            <div id={styles.chatMembros}>
              {chat.users.length} membros
            </div>
          </div>
        </div>
        <Tooltip title="Mais opçoes">
          <IconButton style={{ color: "#90caf9" }} size="large" color="primary" onClick={(e)=>{handleClick(e)}}>
            <MoreVertIcon style={{ fontSize: "30px" }} />
          </IconButton>
        </Tooltip>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{adicionarMembro()}} className={styles.menuItem}>Adicionar participante</MenuItem>
        <MenuItem onClick={()=>{removerMembro()}} className={styles.menuItem}>Remover participante</MenuItem>
      </Menu>
      </div>

      <div id={styles.chatMessages}>
        {chat.message.map((message: any) => (
          <div key={message.id} className={message.user.email == "mvsantos2003@gmail.com"?styles.chatMyMessage:styles.chatMessage}>
            <div className={message.user.email == "mvsantos2003@gmail.com"?styles.chatMyMessageInfo : styles.chatMessageInfo}>
              <span className={styles.chatMessageTime}>
                {new Date(message.createdAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
              </span>
              <span className={styles.chatMessageText}>
                {message.text}
              </span>
            </div>
            <img src={message.user.image} alt="foto de perfil" className={styles.fotoChat} />
          </div>
        ))}
      </div>

      <div id={styles.chatInput}>
        <Input
          placeholder="Mensagem"
          style={{ backgroundColor: '#222e35' }}
          size="large"
          id={styles.inpuEnviar}
          bordered={false}
          onChange={(e) => setEnviarInput(e.target.value)}
        />
        <IconButton style={{ color: "#90caf9" }} size="large" color="primary">
          <Send style={{ fontSize: "30px" }} />
        </IconButton>
      </div>
    </div>
  )
}