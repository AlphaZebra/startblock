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
} from "@wordpress/components";
import block from "./block.json";
import "./index.scss";
import icons from "../../icons";

registerBlockType(block.name, {
  icon: icons.primary,
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent() {
  return (
    <div>
      <p>
        This block will display a list <b>only to admin accounts</b> of visitor
        response information...
      </p>
    </div>
  );
}

function SaveComponent() {
  return null;
}
