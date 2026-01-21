import React, { useState } from 'react'
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import Loader from "../compoents/Loader"
import '../styles/questionForm.css'

const QuestionForm = ({ getCode }) => {

  const [question, setQuestion] = useState("Briefly describe your coding question...");
  const [description, setDescription] = useState("Provide detailed context to help AI assist better...");
  const [output, setOutput] = useState("");
  const [showOutputPrompt, setOutputPrompt] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleFocus = (field) => {
    if (field === 'question' && question === "Briefly describe your coding question...") {
      setQuestion('');
    } else if (field === 'description' && description === "Provide detailed context to help AI assist better...") {
      setDescription('');
    }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const currentCode = getCode();
    const data = { question, description, code: currentCode };
    try {
      const response = await fetch('http://localhost:5000/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });


      if (!response.ok) {
        throw new Error('AI API call failed');
      }

      const result = await response.json();
      setOutputPrompt(true);
      setOutput(result.output);
      setLoader(false);
      console.log('AI Output:', result.output);

    } catch (error) {
      console.error(`Error calling AI API: ${error}`);
      setOutput(`${error}`);
      setLoader(false);
    }
  };

  return (
    loader === true ? (
      <div className='loader'>
        <Loader />
      </div>

    ) :
      (
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label> Question </label>
            <MDEditor
              value={question}
              onChange={setQuestion}
              preview="edit"
              hideToolbar={true}
              height={100}
              onFocus={() => handleFocus('question')}
            />
            <label >Description</label>
            <MDEditor
              value={description}
              onChange={setDescription}
              preview="edit"
              hideToolbar={true}
              height={100}
              onFocus={() => handleFocus('description')}
            />
            <div className="form-submit">
              {/* <button type='submit'>AI Assist</button> */}
              <button type='submit' >
                <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
                  <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>

                <span className="submit-text">Generate</span>
              </button>
            </div>
            {
              showOutputPrompt && (
                <>
              <MDEditor
                value={output}
                textareaProps={{ readOnly: true }}
                preview="preview"
                hideToolbar={true}
                height={250}
              />
              </>
              )
            }


          </div>
        </form>
      )
  )
}

export default QuestionForm