import React from 'react'
import QuestionList from './QuestionList'
import SearchQuestionButton from './SearchQuestionButton'

const Home = () => {
  return (
    <>
      <SearchQuestionButton />  
      <div classname="bg-white">
        現在Firebaseのエラーで大多数の機能にアクセスできない状況になっています
        <br />
        アンケートの回答をするのが非常に難しい状況ですがお願いいたします
      </div>
      <br></br>
        <QuestionList />
    </>
  )
}

export default Home