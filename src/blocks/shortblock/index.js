import { registerBlockType } from "@wordpress/blocks";
import { TextControl, TextareaControl } from "@wordpress/components";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

import block from "./block.json";
import icons from "../../icons";
import "./index.scss";

registerBlockType(block.name, {
  icon: icons.primary,
  edit: EditComponent,
  save(props) {
    return null;
  },
});

function EditComponent(props) {
  const { attributes } = props;
  const { content, altContent } = attributes;
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <p>Normal shortcode content:</p>
      <TextareaControl
        label="This paragraph may contain shortcodes:"
        value={content}
        onChange={(newVal) => props.setAttributes({ content: newVal })}
      />
      <p>Alternate version without shortcodes:</p>
      <TextareaControl
        label="This paragraph should NOT contain shortcodes:"
        value={altContent}
        onChange={(newVal) => props.setAttributes({ altContent: newVal })}
      />
    </div>
  );
}
