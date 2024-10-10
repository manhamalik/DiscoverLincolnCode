import React, { useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FormContext } from '@/contexts/FormContext';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const DescriptionTextboxComponent = () => {
  const context = useContext(FormContext);
  const handleDescriptionChange = (value) => {
    context.setDescription(value);
  };

  return (
    <div className="descriptionTextbox">
      <label htmlFor="description" className="descriptionLabel">Description</label>
      <ReactQuill
        id='description'
        value={context.description}
        onChange={handleDescriptionChange}
        placeholder="Enter event description here..."
        modules={{
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }, { 'color': [] }, 'bold', 'italic', 'underline', 'strike', { 'list': 'bullet' }, { 'list': 'ordered' }, 'link', 'image', 'blockquote']
          ]
        }}
        formats={[
          'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
          'blockquote', 'list', 'bullet', 'link', 'image', 'color'
        ]}
      />
      
      <style jsx>{`
        .descriptionTextbox {
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
        }

        .descriptionLabel {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1vw;
        }

        /* Customizing the Toolbar */
        :global(.ql-toolbar) {
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px 4px 0 0;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding-left: 0;
        }

        :global(.ql-editor) {
          padding: 12px;
          font-size: 1rem;
          height: 10em;
        }

        /* Media Queries for Responsive Design */
        @media (max-width: 768px) {
          .descriptionTextbox {
            width: 100%;
          }
        }

        @media (max-width: 480px) {

          .descriptionLabel {
            font-size: 1rem;
          }
        }

        :global(.ql-snow .ql-stroke, .ql-snow .ql-fill) {
          stroke: #000;
        }
      `}</style>
    </div>
  );
};

export default DescriptionTextboxComponent;
