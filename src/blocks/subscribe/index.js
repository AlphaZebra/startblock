import { registerBlockType } from '@wordpress/blocks'
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor'
import {TextControl, Button, PanelBody, ColorPalette } from "@wordpress/components"
import block from './block.json'

registerBlockType( block.name, {
    edit: EditComponent,
    save: SaveComponent
} )


function EditComponent( {attributes, setAttributes } ) {
    const { content, nameContent, underline_color } = attributes
    const blockProps = useBlockProps()

    return ( 
        <div>
        <InspectorControls>
                <PanelBody title="Colors">
                    <ColorPalette 
                        colors={[
                            { name: 'Red', color: '#f87171'},
                            { name: 'Indigo', color: '#818cf8'}
                        ]}
                        value={underline_color}
                        onChange={newVal => setAttributes({underline_color: newVal})}
                    />
                </PanelBody>

            </InspectorControls>
        <div >
            <p>This block creates a form that is displayed to the user to ask for their
                email and name. You determine the background and border colors, along with any border radius.
            </p>
            <TextControl

                label= "Enter the text you'd like to use to prompt users for their email address..."
                placeholder="Prompt for email:" 
                value={content}
                onChange={newVal => setAttributes({ content: newVal })}
            />
            
            <TextControl
                
                label= "Enter the text to prompt for the user's name..."
                placeholder="Prompt for first and last name:" 
                value={nameContent}
                onChange={newVal => {setAttributes({ nameContent: newVal })
                }  }
            />
        </div>
        </div>
    )
}

function SaveComponent ( {attributes} ) {
    const { content, nameContent } = attributes
    const blockProps = useBlockProps.save()

    const thisURL = window.location.href
    const url = new URL(thisURL)
    const adminPath = url.hostname + '/wp-admin/admin-post.php'
    

    return (
        
        
        <div>
        <form action={adminPath}  method="POST">
                <input type="hidden" name="action" value="do-subscriber" required />
                
                <p>{content}</p>
                <input type="text" name="fname" placeholder="First name..."/>
                <input type="text" name="lname" placeholder="Last name..."/>
            
                <p>{nameContent}</p>
               
                <button>Submit!</button>
            </form>
        </div>
       
    )
}