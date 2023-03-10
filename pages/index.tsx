import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MenuChats from '../components/MenuChats'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import Chat from '../components/Chat'

export default function Home(props:any) {
  const [chatSelected, setChatSelected] = useState<any>()
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MenuChats chats={props.chats} setChatSelected={setChatSelected} chatSelected={chatSelected?.id}/>
        {chatSelected && <Chat chat={chatSelected} />}
      </main>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async (context) => {
  const { data } = await axios.get('http://localhost:3333/api/chats/user/3')
  return {
    props: {
      chats: data
    }
  }
}
