import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import QuestionForm from './QuestionForm';
const AIQuestionModal = ({ getCode }) => {

  return (
    <div className="question-modal">
      <Accordion
        sx={{
          backgroundColor: 'rgba(13, 17, 23, 0.5)', // #0d1117 with transparency
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          marginTop: '10px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ color: 'white' }} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span" sx={{ color: 'white' }} >AI Assist</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QuestionForm getCode={() => getCode()} />
        </AccordionDetails>
      </Accordion>

    </div>
  )
}

export default AIQuestionModal
// #0d1117