import { registerBlockType } from '@wordpress/blocks'
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, ColorPalette, ToggleControl } from '@wordpress/components'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import { useState } from '@wordpress/element';

import block from './block.json'
import icons from '../../icons'
import './index.scss'



registerBlockType(block.name, {
    
    icon: icons.primary,
    edit: EditComponent,
    save: SaveComponent
})


function EditComponent(props) {
    const blockProps = useBlockProps()
    var myCheck = true;
    const [ hasFixedBackground, setHasFixedBackground ] = useState( false );
    const curQuestion = props.attributes.question


    function updateQuestion(newVal) {
        props.setAttributes({question: newVal})
    }

    function updateSlug(newVal) {
        props.setAttributes({slug: newVal})
    }

    function deleteAnswer(x) {
        const newAnswers = props.attributes.answers.filter(function(z, index) {
            return index != x
        })
        props.setAttributes({answers: newAnswers})

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
                <TextControl label="Question short name:" />
                <TextControl label="Priority" />
                <ColorPalette />
            </PanelBody>
        </InspectorControls>
       
        <div  className="pz-question-block">
        <ToggleControl
            label="Fixed Background"
            checked={hasFixedBackground}
            onChange={ () => {
                setHasFixedBackground( ( state ) => ! state );
            } }
           
        />
            <TextControl   label="Question:" value={props.attributes.question} onChange={updateQuestion} style={{ fontSize: "20px" }} />
            <TextControl   label="Slug name:" value={props.attributes.slug} onChange={updateSlug}  style={{ fontSize: "20px" }} />
            <p style={{fontSize: "13px", margin: "20px 0 8px 0"}}>Answers:</p>
            {props.attributes.answers.map(function(answer, index) {
                return (
                    <Flex>
                        <FlexBlock>
                            <TextControl value={answer} onChange={x => {
                                const newAnswers = props.attributes.answers.concat([])
                                newAnswers[index] = x
                                props.setAttributes({answers: newAnswers})
                            } }/>
                        </FlexBlock>
                        
                        <FlexItem>
                            <Button variant="link" className="pz-delete" onClick={() => deleteAnswer(index)}>
                                Delete
                            </Button>
                        </FlexItem>

                    </Flex>
                )
            })}
            <Button variant="primary" onClick={() => {
                props.setAttributes({answers: props.attributes.answers.concat([""])})
            }}>
                Add another answer
            </Button> 
           
           
        </div>
        </div>
    )
}

function SaveComponent({attributes}) {
   
    const thisURL = window.location.href
    const url = new URL(thisURL)
    const adminPath = url.protocol + '//' + url.host + '/wp-admin/admin-post.php'
    
   
    return(
        <div>
             <h1>Here we go on the frontend! </h1>
             
             <form action={adminPath}  method="POST">
                <input type="hidden" name="action" value="do-question-block" required />                
                <input type="hidden" name="qslug" value={ attributes.slug } />

                <p> {attributes.question} </p>

                {attributes.answers.map(function(answer, index) {
                    return(
                        <div>
                            <input type="radio" id={answer} name="qchoice" value={answer} />
                            <label for={answer}>{answer}</label><br></br>
                        </div>
                    )

                })}

                <button>Submit!</button>
             </form>
        </div>
       
    )
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }