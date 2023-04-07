import { registerBlockType } from '@wordpress/blocks'
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor'
import {TextControl, Button, PanelBody, ColorPalette } from "@wordpress/components"
import block from './block.json'

registerBlockType( block.name, {
    edit: EditComponent,
    save({ attributes }) {
        const { content } = attributes
        const blockProps = useBlockProps.save()

        return (
            <>
            
            <div>
                <TextControl.Content 
                    {...blockProps}
                    value={ content }
                />
                <form>
                    <p>Some text... </p>
                    <input type="text" />
                </form>
            </div>
            </>
        )
    }
} )


function EditComponent( {attributes, setAttributes } ) {
    const { content, underline_color } = attributes
    const blockProps = useBlockProps()

    return (
        <>
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
        <div>
            <TextControl
                {...blockProps}
                label= "Enter the text you'd like to use to prompt users for their email address..."
                placeholder="Prompt for email:" 
                value={content}
                onChange={newVal => setAttributes({ content: newVal })}
            />
        </div>
        </>
    )
}

