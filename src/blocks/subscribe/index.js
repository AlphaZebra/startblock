import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  useBlockProps,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  TextControl,
  Button,
  PanelBody,
  ColorPalette,
  ToggleControl,
} from "@wordpress/components";
import block from "./block.json";
import "./index.scss";
import icons from "../../icons";
import { useState } from "@wordpress/element";

registerBlockType(block.name, {
  icon: icons.primary,
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent({ attributes, setAttributes }) {
  const { content, nameContent, background_color, border_color, text_color } =
    attributes;
  const [showNameFields, setShowNameFields] = useState(true);
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <InspectorControls>
        <ToggleControl
          label="Show name fields?"
          help={showNameFields ? "Show name fields." : "Hide name fields."}
          checked={showNameFields}
          onChange={() => {
            setShowNameFields((state) => !state);
          }}
        />
        <PanelBody title="Colors">
          <p>Background color</p>
          <ColorPalette
            value={background_color}
            onChange={(newVal) => setAttributes({ background_color: newVal })}
          />
          <p>Border color</p>
          <ColorPalette
            value={border_color}
            onChange={(newVal) => setAttributes({ border_color: newVal })}
          />
          <p>Text color</p>
          <ColorPalette
            value={text_color}
            onChange={(newVal) => setAttributes({ text_color: newVal })}
          />
        </PanelBody>
      </InspectorControls>
      <div>
        <p>
          This block creates a form that is displayed to the user to ask for
          their email and name. You determine the background and border colors,
          along with any border radius.
        </p>
        <TextControl
          label="Enter the text you'd like to use to prompt users for their email address..."
          placeholder="Prompt for email:"
          value={content}
          onChange={(newVal) => setAttributes({ content: newVal })}
        />

        <TextControl
          label="Enter the text to prompt for the user's name..."
          placeholder="Prompt for first and last name:"
          value={nameContent}
          onChange={(newVal) => {
            setAttributes({ nameContent: newVal });
          }}
        />
      </div>
    </div>
  );
}

function SaveComponent({ attributes }) {
  const { content, nameContent, background_color, border_color, text_color } =
    attributes;
  const blockProps = useBlockProps.save();

  const thisURL = window.location.href;
  const url = new URL(thisURL);
  const adminPath = url.protocol + "//" + url.host + "/wp-admin/admin-post.php";
  const pz_bg =
    "border-width: 2px; background-color: " +
    background_color +
    "; border-color: " +
    border_color +
    "; color: " +
    text_color;

  return (
    <div className="pz-form-div" style={pz_bg}>
      <form action={adminPath} method="POST">
        <input type="hidden" name="action" value="do-startblock" required />

        <p className="pz-startblock-text">{content}</p>
        <input type="email" name="email" placeholder="Email..." />

        <p className="pz-startblock-text">{nameContent}</p>
        <input type="text" name="fname" placeholder="First name..." />
        <input type="text" name="lname" placeholder="Last name..." />
        <p />
        <button variant="primary">Submit!</button>
      </form>
    </div>
  );
}
