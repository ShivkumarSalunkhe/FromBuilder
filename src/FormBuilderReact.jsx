/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { ReactFormBuilder, Registry } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { Col, Container, Row } from "react-bootstrap";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./FormBuilderReact.css";


const styles = {
  label: {
    fontWeight: "normal",
    margin: "auto",
  },
  Container: { paddingTop: "20px" },
  MainDiv: { margin: "10px 0px", width: "100%", marginBottom: "50px" },
  FormTitle: {
    color: "#000078",
    fontSize: "1.5rem",
    fontFamily: "sans-serif",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  discardBtn: {
    marginRight: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    border: "navy solid 1px",
    color: "navy",
    width: "185px",
    height: "43px",
  },
  saveBtn: {
    marginRight: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    backgroundColor: "#000078",
    width: "185px",
    height: "43px",
  },
  readOnlyBtn: {
    marginRight: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  previewBtn: {
    width: "185px",
    height: "43px",
    marginRight: "10px",
    backgroundColor: "#353535",
    color: "white",
    fontFamily: "sans-serif",
  },
};

const FormHeader = (props) => {
  const [data, setData] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);
  const [shortPreviewVisible, setShortPreviewVisible] = useState(false);
  const [roPreviewVisible, setRoPreviewVisible] = useState(false);


  useEffect(() => {
    ElementStore.subscribe((state) => _onUpdate(state.data));
  }, []);

  const _onUpdate = (data) => {
    setData(data);
    console.log(data);
  };

  const showPreview = () => {
    setPreviewVisible(true);
  };

  const showRoPreview = () => {
    setRoPreviewVisible(true);
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setShortPreviewVisible(false);
    setRoPreviewVisible(false);
  };

  const _onSubmit = (ansData) => {
    console.log("onSubmit", ansData);
  };



  let modalClass = "modal";
  if (previewVisible) {
    modalClass += " show d-block";
  }

  let shortModalClass = "modal short-modal";
  if (shortPreviewVisible) {
    shortModalClass += " show d-block";
  }

  let roModalClass = "modal ro-modal";
  if (roPreviewVisible) {
    roModalClass += " show d-block";
  }

  return (
    <div className="clearfix" style={styles.MainDiv}>
      <h4 className="" style={styles.FormTitle}>
        Create New Form
      </h4>
      <div className="d-flex justify-content-end">
          {" "}
          <Button className=" float-right" style={styles.discardBtn}>
            Discard
          </Button>
          <Button
            className=" float-right"
            style={styles.saveBtn}
          >
            Save
          </Button>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-default float-left"
          style={styles.readOnlyBtn}
          onClick={showRoPreview}
        >
          Read Only Form
        </button>
        <button
          className="btn btn-primary float-left"
          style={styles.previewBtn}
          onClick={showPreview}
        >
          Preview Form
        </button>
      </div>

      {previewVisible && (
        <div className={modalClass} role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" style={{ padding: "20px" }}>
              <ReactFormGenerator
                download_path=""
                back_action="/"
                back_name="Back"
                submitButton={
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                }
                form_action="/"
                form_method="POST"
                onSubmit={_onSubmit}
                variables={props.variables}
                data={data}
              />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={closePreview}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {roPreviewVisible && (
        <div className={roModalClass}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ padding: "20px" }}>
              <ReactFormGenerator
                download_path=""
                back_action="/"
                back_name="Back"
                action_name="Save"
                form_action="/"
                form_method="POST"
                read_only={true}
                variables={props.variables}
                hide_actions={true}
                data={data}
              />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={closePreview}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {shortPreviewVisible && (
        <div className={shortModalClass}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ padding: "20px" }}>
              <ReactFormGenerator
                download_path=""
                back_action=""
                form_action="/"
                form_method="POST"
                data={data}
                display_short={true}
                variables={props.variables}
                hide_actions={false}
              />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={closePreview}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};




const Value_Tolerance = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  return (
    <>
      <div
      >
        <div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <input
              className="form-control"
              placeholder="Enter Correct Value"
              id="1"
              type="number"
    
              ref={ref}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
            />
          </div>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <div className="input-group" style={{width:'80%'}}>
              <input
                className="form-control"
                placeholder="Min Value"
                id="2"
                type="number"
                ref={ref}
                name={name}
                defaultValue={defaultValue}
                disabled={disabled}
                value={props.data.min_value}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  {props.data.min_label}
                </span>
              </div>
            </div>

            <label
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                margin: "auto",
              }}
            >
              Min Value
            </label>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px"  }}
          >
            <div className="input-group" style={{width:'80%'}}>
              <input
                className="form-control"
                placeholder="Max Value"
                id="3"
                type="number"
                ref={ref}
                name={name}
                defaultValue={defaultValue}
                disabled={disabled}
                value={props.data.max_value}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  {props.data.max_label}
                </span>
              </div>
            </div>

            <label
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                margin: "auto",
              }}
            >
              Max Value
            </label>
          </div>
        </div>
      </div>
    </>
  );
});

const Percentage_Tolerance = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "20px 200px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "20px" }}
          >
            <input
              className="form-control"
              placeholder="Enter Value"
              id="2"
              type="number"
              style={{ width: "250px" }}
              ref={ref}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "20px" }}
          >
            <input
              className="form-control"
              placeholder="Enter Tolerence"
              id="3"
              type="number"
              style={{ width: "250px" }}
            />
            <label
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                margin: "auto 20px",
              }}
            >
              %
            </label>
          </div>
        </div>
      </div>
    </>
  );
});

Value_Tolerance.displayName = "Value_Tolerance";
Percentage_Tolerance.displayName = "Percentage_Tolerance";

Registry.register("Range", Value_Tolerance);
Registry.register("Percentage_Tolerance", Percentage_Tolerance);

const items = [
  {
    key: "Range",
    element: "CustomElement",
    component: Value_Tolerance,
    type: "custom",
    forwardRef: true,
    field_name: "Value_Tolerance_",
    name: "Value Tolerance",
    icon: "fa fa-cog",
    label: "Value Tolerance",
    step: 1,
    min_value: 0,
    max_value: 0,
    min_label: "Unit",
    max_label: "Unit",
  },
  {
    key: "Range2",
    element: "CustomElement",
    component: Percentage_Tolerance,
    type: "custom",
    forwardRef: true,
    field_name: "Percentage_Tolerance_",
    name: "Percentage Tolerance",
    icon: "fa fa-cog",
    label: "Percentage Tolerance",
    step: 1,
    min_value: 1,
    max_value: 10,
    min_label: "Unit",
    max_label: "Unit",
  },
  { key: "Header" },
  { key: "TextInput" },
  { key: "TextArea" },
  { key: "NumberInput" },
  { key: "Dropdown" },
  { key: "DatePicker" },
  { key: "RadioButtons" },
  { key: "Rating" },
  { key: "MultiColumnRow" },
  { key: "ThreeColumnRow" },
  { key: "TwoColumnRow" },
  { key: "Checkboxes" },
  { key: "Image" },
];

const FormBuilderReact = () => {


  return (
    <>
      <Container style={styles.Container}>
        <FormHeader />
        <Row>
          <Col>
            <ReactFormBuilder toolbarItems={items} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormBuilderReact;

FormHeader.propTypes = {
  variables: PropTypes.any,
  min_value: PropTypes.any,
  max_value: PropTypes.any,
};
