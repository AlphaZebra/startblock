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
  const { content } = attributes;

  return (
    <div>
      <TextareaControl
        label="This paragraph may contain shortcodes:"
        value={content}
        onChange={(newVal) => props.setAttributes({ content: newVal })}
      />
    </div>
  );
}
