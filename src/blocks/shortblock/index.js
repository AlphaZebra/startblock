import { registerBlockType } from '@wordpress/blocks'
import { TextControl, TextareaControl } from '@wordpress/components'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import { useState } from '@wordpress/element';

import block from './block.json'
import icons from '../../icons'

registerBlockType(block.name, {
    icon: icons.primary,
    edit(props) {

        return (
            <div>
                <TextareaControl 
                    label="This paragraph may contain shortcodes:"
                    value={props.attributes.content}
                    onChange={newVal => props.setAttributes({content: newVal}) }
                />
            </div>
        )
    },
    save(props) {
        
        return (
            null
            
        )
    }
})