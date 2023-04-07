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
    var index = 0
    var i = 0
    var myChoices = []
    const blockProps = useBlockProps()

    function updateQuestion(newVal) {
        var newQuestions = props.attributes.questions.concat([])      //returns a copy of array, so we can manipulate
        newQuestions[newQuestions.length-1] = newVal
        props.setAttributes({questions: newQuestions})
    }

    return (
        <div {...blockProps} className="pz-question-block">
            <Button variant="primary" onClick={() => {props.setAttributes({questions: props.attributes.questions[0].choices.concat(["new"])})
            }}>
                Add another question
            </Button>
            {props.attributes.questions.map((q, i) => {
                return(
                    <>
                
                <TextControl   label="Question:" value={q} onChange={updateQuestion} style={{ fontSize: "20px" }} />
                <Button variant="primary" >
                    Add another answer
                </Button>
                
                { props.attributes.choices.map((choice,index) => {
                    myChoices = choice.split(",")

                    return(
                        index == i ?    // is this the right set of answers for this question?
                        
                        myChoices.map((x) => {
                            return( 
                            <>
                                    <tr>
                                        <td width="400px">
                                        <TextControl value={x} />
                                        <input type="hidden" value={index}/>
                                    
                                        </td>
                                        <td>
                                        <Button>
                                            <Icon className="pz-star-empty" icon= "star-filled" />
                                        </Button>
                                        </td>
                                        <td>
                                        <Button>
                                        <Icon icon= "table-row-delete" />
                                        </Button>
                                        </td>
                               
                                        </tr>
                                         
                                       
                                    
                               
                            </> 
                            )
                            
                        })
                        :""     // if not, don't display the answers for some other question
                        
                        )  
                            
                    })}
                    
                    </>
                )
                
            })}    
                   
                    
                        
        </div>
    )
}

function EditComponentHold(props) {
    const blockProps = useBlockProps()


    function updateQuestion(newVal) {
        props.setAttributes({question: newVal})
    }

    function deleteAnswer(x) {
        const newAnswers = props.attributes.questions[0].answers.filter(function(x, index) {
            return index != x
        })
        props.setAttributes({choices: newAnswers})

        if(x == props.attributes.correctAnswer) {
            props.setAttributes({correctAnswer: undefined})
        }
    }

    function setAnswer(x) {
        props.setAttributes({correctAnswer: x})
    }

    

    return (
        <div {...blockProps}>
        <InspectorControls>
            <PanelBody title="Screw you!">
                <p>Hello.</p>
            </PanelBody>
        </InspectorControls>
       
        <div  className="pz-question-block">
         
            <TextControl   label="Question:" value={props.attributes.questions[0].question} onChange={updateQuestion} style={{ fontSize: "20px" }} />
            <p style={{fontSize: "13px", margin: "20px 0 8px 0"}}>Answers:</p>
            {props.attributes.questions.choices.map(function(answer, index) {
                return (
                    <Flex>
                        <FlexBlock>
                            <TextControl value={answer} onChange={x => {
                                const newAnswers = props.attributes.questions[0].choices.concat([])
                                newAnswers[index] = x
                                props.setAttributes({choices: newAnswers})
                            } }/>
                        </FlexBlock>
                        <FlexItem>
                            <Button onClick={() => setAnswer(index)}>
                                <Icon className="pz-star-empty" icon={props.attributes.correctAnswer == index ? "star-filled" : "star-empty" } />
                            </Button>
                        </FlexItem>
                        <FlexItem>
                            <Button variant="link" className="pz-delete" onClick={() => deleteAnswer(index)}>
                                Delete
                            </Button>
                        </FlexItem>

                    </Flex>
                )
            })}
            <Button variant="primary" onClick={() => {
                props.setAttributes({answers: props.attributes.questions[0].choices.concat([""])})
            }}>
                Add another answer
            </Button> 
        </div>
        </div>
    )
}

