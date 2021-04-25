import React, { useState } from "react"
import { Helm } from "../icons"

const FlashCardSide = ({
  className,
  prompt,
  answer,
  onClick,
  sectionTitle,
  isFront,
  tryAgain,
  good,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} bg-gradient-to-tr ${
        isFront
          ? "from-gray-700 via-gray-800 to-gray-900 text-michelangelo-white"
          : "from-nord-12 via-nord-13 to-nord-14 text-gray-800"
      }   w-64 sm:w-72 h-96 rounded-2xl shadow-lg grid p-1 items-center justify-center`}
      style={{
        gridTemplateColumns: "1fr",
      }}
    >
      <div
        className="h-full w-full border border-michelangelo-blue rounded-xl grid"
        style={{ gridTemplateRows: "max-content 1fr max-content" }}
      >
        <div className="row-start-1 pt-1 flex justify-between items-center">
          <span className="text-xs ml-3 mt-1 font-normal text-left font-family-secondary">
            {sectionTitle}
          </span>
          <Helm className="h-6 w-6 mr-3 " />
        </div>
        {isFront ? (
          <div className="row-start-2 self-center justify-self-center mx-1 text-xl text-center">
            {prompt}
          </div>
        ) : (
          <div
            className="row-start-2 grid p-3"
            style={{
              gridTemplateRows: "max-content 1fr",
            }}
          >
            <h3 className="mt-5 text-sm font-semibold justify-self-start self-start">
              {prompt}
            </h3>
            <h2 className="mt-5 text-3xl text-center justify-self-center self-center">
              {answer}
            </h2>
          </div>
        )}

        {isFront ? (
          <div className="row-start-3 mb-1 ml-2 text-xs flex text-nord-3">
            {sectionTitle ? (
              <span>Pulsa en la carta para ver la respuesta</span>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="row-start-3 mb-5 flex justify-around">
            <button onClick={tryAgain}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-800"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button onClick={good}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-800"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const FlashCard = ({
  className,
  sectionTitle,
  prompt,
  answer,
  tryAgain,
  good,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const postTryAgain = () => {
    if (tryAgain) {
      setIsFlipped(false)
      tryAgain()
    }
  }
  const postGood = () => {
    if (good) {
      setIsFlipped(false)
      good()
    }
  }
  return (
    <div className={`${className ? className : ""}`}>
      <FlashCardSide
        isFront={true}
        prompt={prompt}
        sectionTitle={sectionTitle}
        onClick={() => setIsFlipped(true)}
        className={`${isFlipped ? "hidden" : "block cursor-pointer"}`}
      />
      <FlashCardSide
        isFront={false}
        prompt={prompt}
        answer={answer}
        sectionTitle={sectionTitle}
        tryAgain={() => {
          setIsFlipped(false)
          postTryAgain()
        }}
        good={() => {
          postGood()
        }}
        className={`${
          isFlipped ? "block cursor-default" : "hidden"
        } font-semibold`}
      />
    </div>
  )
}

const FlashCardSetCompleteFlashCard = ({ className }) => {
  return (
    <div className={`${className ? className : ""}`}>
      <FlashCardSide
        isFront={true}
        prompt="El repaso ha finalizado"
        className="block cursor-none"
      ></FlashCardSide>
    </div>
  )
}

export default FlashCard
export { FlashCardSetCompleteFlashCard }
