import React from 'react'
import QuestionList from './QuestionList'
import SearchQuestionButton from './SearchQuestionButton'

const Home = () => {
  return (
    <>
      <h1>Question</h1>
      <QuestionList />
      <SearchQuestionButton />
    </>
  )
}

export default Home