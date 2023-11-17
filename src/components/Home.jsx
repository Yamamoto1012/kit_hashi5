import React from 'react'
import QuestionList from './QuestionList'
import SearchQuestionButton from './SearchQuestionButton'

const Home = () => {
  return (
    <>
    <div className='w-full shadow-md h-8'>
      <h1 className='text-white text-center'>Question</h1>
    </div>
      <QuestionList />
      <SearchQuestionButton />
    </>
  )
}

export default Home