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
  const {
    content,
    nameContent,
    titleContent,
    background_color,
    border_color,
    text_color,
    show_name,
    buttonBackgroundColor,
    buttonTextColor,
    buttonContent,
  } = attributes;
  const blockProps = useBlockProps();
  const [willShow, setWillShow] = useState(show_name);

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Settings">
          <ToggleControl
            label="Show name fields?"
            value={willShow}
            checked={willShow}
            onChange={(v) => {
              setWillShow(v);
              setAttributes({ show_name: v });
            }}
          />
        </PanelBody>
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
          <p>Button background color</p>
          <ColorPalette
            value={buttonBackgroundColor}
            onChange={(newVal) =>
              setAttributes({ buttonBackgroundColor: newVal })
            }
          />
          <p>Button text color</p>
          <ColorPalette
            value={buttonTextColor}
            onChange={(newVal) => setAttributes({ buttonTextColor: newVal })}
          />
        </PanelBody>
      </InspectorControls>
      <div className="pz-subscribe-block">
        <p>
          This block creates a form that is displayed to the user to ask for
          their email and name. You determine the background and border colors,
          along with any border radius.
        </p>
        <TextControl
          label="Enter title text for the block..."
          placeholder="Box title:"
          value={titleContent}
          onChange={(newVal) => setAttributes({ titleContent: newVal })}
        />

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
        <TextControl
          label="Enter button text..."
          placeholder="Submit"
          default="Submit"
          value={buttonContent}
          onChange={(newVal) => {
            setAttributes({ buttonContent: newVal });
          }}
        />
      </div>
    </div>
  );
}

function SaveComponent({ attributes }) {
  const {
    content,
    nameContent,
    titleContent,
    background_color,
    border_color,
    text_color,
    show_name,
    buttonBackgroundColor,
    buttonTextColor,
    buttonContent,
  } = attributes;
  const blockProps = useBlockProps.save();
  let display_tag = "display: block";

  const thisURL = window.location.href;
  const url = new URL(thisURL);
  const adminPath = url.protocol + "//" + url.host + "/wp-admin/admin-post.php";
  const pz_bg =
    "border-width: 2px; border-radius: 4px; background-color: " +
    background_color +
    "; border-color: " +
    border_color +
    "; color: " +
    text_color;

  if (show_name == true) {
    display_tag = "display: block";
  } else display_tag = "display: none";

  const pz_button =
    "border-width: 0px; border-radius: 2px; background-color: " +
    buttonBackgroundColor +
    "; color: " +
    buttonTextColor;

  return (
    <>
      <div className="pz-form-div" {...blockProps} id="pzs" style={pz_bg}>
        <form action={adminPath} method="POST">
          <input
            type="hidden"
            className="pz-input"
            name="action"
            value="do-startblock"
            required
          />

          <h4 className="pz-startblock-h4">{titleContent}</h4>

          <p className="pz-startblock-text">{content}</p>
          <input type="email" name="email" placeholder="Email..." />

          <div style={display_tag}>
            <p className="pz-startblock-text">{nameContent}</p>
            <input type="text" name="fname" placeholder="First name..." />
            <input type="text" name="lname" placeholder="Last name..." />
          </div>
          <p />
          <button
            className="pz-startblock-button"
            style={pz_button}
            variant="primary"
          >
            {buttonContent}
          </button>
        </form>
      </div>
      <script>pz_vanishing_act();</script>
    </>
  );
}
