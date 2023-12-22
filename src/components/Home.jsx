import React from 'react'
import QuestionList from './QuestionList'
import SearchQuestionButton from './SearchQuestionButton'

const Home = () => {
  return (
    <>
      <SearchQuestionButton />  
      <br></br>
        <QuestionList />
    </>
  )
}

export default Home