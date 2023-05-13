import { registerBlockType } from "@wordpress/blocks";
import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
  PanelBody,
  ColorPicker,
  ToggleControl,
} from "@wordpress/components";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

import block from "./block.json";
import icons from "../../icons";
import "./index.scss";

registerBlockType(block.name, {
  icon: icons.primary,
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  const blockProps = useBlockProps();
  const { attributes, setAttributes } = props;
  const { textColor } = attributes;
  var myCheck = true;
  const [hasFixedBackground, setHasFixedBackground] = useState(false);
  const curQuestion = props.attributes.question;

  function updateQuestion(newVal) {
    props.setAttributes({ question: newVal });
  }

  function updateSlug(newVal) {
    props.setAttributes({ slug: newVal });
  }

  function updateTextColor(newVal) {
    props.setAttributes({ textColor: newVal });
  }

  function updateButtonTextColor(newVal) {
    props.setAttributes({ buttonTextColor: newVal });
  }

  function updateButtonBackgroundColor(newVal) {
    props.setAttributes({ buttonBackgroundColor: newVal });
  }

  function updateBlockBackgroundColor(newVal) {
    props.setAttributes({ blockBackgroundColor: newVal });
  }

  function deleteAnswer(x) {
    const newAnswers = props.attributes.answers.filter(function (z, index) {
      return index != x;
    });
    props.setAttributes({ answers: newAnswers });

    if (x == props.attributes.correctAnswer) {
      props.setAttributes({ correctAnswer: undefined });
    }
  }

  function setAnswer(x) {
    props.setAttributes({ correctAnswer: x });
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Settings">
          <p>Question and answer text:</p>
          <ColorPicker
            color={props.attributes.textColor}
            onChange={updateTextColor}
          />
          <p>Button text:</p>
          <ColorPicker
            color={props.attributes.buttonTextColor}
            onChange={updateButtonTextColor}
          />
        </PanelBody>
        <p>Button background:</p>
        <ColorPicker
          color={props.attributes.buttonBackgroundColor}
          onChange={updateButtonBackgroundColor}
        />
        <p>Block background:</p>
        <ColorPicker
          color={props.attributes.blockBackgroundColor}
          onChange={updateBlockBackgroundColor}
        />
      </InspectorControls>

      <div className="pz-question-block">
        <TextControl
          label="Question:"
          value={props.attributes.question}
          onChange={updateQuestion}
          style={{ fontSize: "20px" }}
        />
        <TextControl
          label="Slug name:"
          value={props.attributes.slug}
          onChange={updateSlug}
          style={{ fontSize: "20px" }}
        />
        <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answers:</p>
        {props.attributes.answers.map(function (answer, index) {
          return (
            <Flex>
              <FlexBlock>
                <TextControl
                  value={answer}
                  onChange={(x) => {
                    const newAnswers = props.attributes.answers.concat([]);
                    newAnswers[index] = x;
                    props.setAttributes({ answers: newAnswers });
                  }}
                />
              </FlexBlock>

              <FlexItem>
                <Button
                  variant="link"
                  className="pz-delete"
                  onClick={() => deleteAnswer(index)}
                >
                  Delete
                </Button>
              </FlexItem>
            </Flex>
          );
        })}
        <Button
          variant="primary"
          onClick={() => {
            props.setAttributes({
              answers: props.attributes.answers.concat([""]),
            });
          }}
        >
          Add another answer
        </Button>
      </div>
    </div>
  );
}

function SaveComponent({ attributes }) {
  const thisURL = window.location.href;
  const url = new URL(thisURL);
  const adminPath = url.protocol + "//" + url.host + "/wp-admin/admin-post.php";
  var jollyString =
    `
    .pz-question-block {
        background-color:` +
    attributes.blockBackgroundColor +
    `;
    }
    .pz-question-button {
        margin-top: 20px;
       border:none;
       padding:15px;
       background-color:` +
    attributes.buttonBackgroundColor +
    `; 
       color:` +
    attributes.buttonTextColor +
    `;
       font-weight:600;
       border-radius:5px;
       width:100%;

   }
   .pz-question-text {
    color:` +
    attributes.textColor +
    `
   }
   .pz-answer-text {
    color:` +
    attributes.textColor +
    `
   }
`;

  return (
    <div className="pz-question-block">
      <style>{jollyString}</style>

      <form action={adminPath} method="POST">
        <input type="hidden" name="action" value="do-question-block" required />
        <input type="hidden" name="qslug" value={attributes.slug} />

        <p className="pz-question-text">{attributes.question}</p>

        {attributes.answers.map(function (answer, index) {
          return (
            <div>
              <input type="radio" id={answer} name="qchoice" value={answer} />
              <label className="pz-answer-text" for={answer}>
                {answer}
              </label>
              <br></br>
            </div>
          );
        })}

        <button className="pz-question-button">Submit!</button>
      </form>
    </div>
  );
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
