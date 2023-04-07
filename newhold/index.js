import { registerBlockType } from '@wordpress/blocks'
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, ColorPalette } from '@wordpress/components'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

import block from './block.json'
import icons from '../../icons'
import './index.scss'

registerBlockType(block.name, {
    
    icon: icons.primary,
    edit: EditComponent,
    save: function () {
        return null
    }
})


function EditComponent(props) {
    const blockProps = useBlockProps()

  

    questions = {props}
    console.log(props.questions.value)

    const onQuestionChange = (index, question) => {
      const newQuestions = [...questions];
      newQuestions[index].question = question;
      setAttributes({ questions: newQuestions });
    };

    const onChoicesChange = (index, choices) => {
      const newQuestions = [...questions];
      newQuestions[index].choices = choices;
      setAttributes({ questions: newQuestions });
    };

    const onAnswerChange = (index, answer) => {
      const newQuestions = [...questions];
      newQuestions[index].answer = answer;
      setAttributes({ questions: newQuestions });
    };

    const onAddQuestionClick = () => {
      const newQuestions = [
        ...questions,
        {
          question: "",
          choices: ["", "", "", ""],
          answer: ""
        }
      ];
      setAttributes({ questions: newQuestions });
    };

    const onRemoveQuestionClick = (index) => {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setAttributes({ questions: newQuestions });
    };

    

    return (
        <div {...blockProps}>
         
        {questions.map((question, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <TextControl
              label="Question"
              value={question.question}
              onChange={(question) => onQuestionChange(index, question)}
            />
            <br />
            <TextAreaControl
              label="Choices"
              value={question.choices.join("\n")}
              onChange={(choices) => {
                const newChoices = choices.split("\n");
                onChoicesChange(index, newChoices);
              }}
            />
            <br />
            <TextControl
              label="Answer"
              value={question.answer}
              onChange={(answer) => onAnswerChange(index, answer)}
            />
            <br />
            {index !== 0 && (
              <Button isDestructive onClick={() => onRemoveQuestionClick(index)}>Remove Question</Button>
            )}
            <hr />
          </div>
        ))}
        <Button onClick={onAddQuestionClick}>Add Question</Button>
      </div>
    );
}

