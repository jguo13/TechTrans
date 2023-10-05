import React, { useState } from 'react';
import { CgDebug, CgArrowsExpandDownRight } from 'react-icons/cg';
import { RiImageEditFill } from 'react-icons/ri';

import AnnotatablePage from './AnnotatablePage';
import Layout from "../../Layout";
import Login from "../../Login";
import Signup from "../../Signup";
import Profile from "../../Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Range = maxValue =>
  Array.from(Array(maxValue).keys());

const EndlessViewer = props => {

  const [debug, setDebug] = useState(false);

  const [annotationMode, setAnnotationMode] = useState('ANNOTATION');

  const onToggleRelationsMode = () => {
    if (annotationMode === 'RELATIONS')
      setAnnotationMode('ANNOTATION');
    else
      setAnnotationMode('RELATIONS');
  }

  const onToggleImageMode = () => {
    if (annotationMode === 'IMAGE')
      setAnnotationMode('ANNOTATION');
    else
      setAnnotationMode('IMAGE');
  }

  return (

    <div>
      <BrowserRouter>
        <header>
          <div className="login">
            <span className="inner">

              <Routes>
                <Route path="/" element={<Layout></Layout>}>
                  <Route index element={<Login></Login>}></Route>
                  <Route path="/signup" element={<Signup></Signup>} ></Route>
                  <Route path="/profile" element={<Profile></Profile>}></Route>
                </Route>
              </Routes>

            </span>
          </div>
          <button onClick={() => setDebug(!debug)}>
            <span className="inner">
              <CgDebug />
            </span>
          </button>

          <button
            className={annotationMode === 'RELATIONS' ? 'active' : null}
            onClick={onToggleRelationsMode}>
            <span className="inner">
              <CgArrowsExpandDownRight />
            </span>
          </button>

          <button
            className={annotationMode === 'IMAGE' ? 'active' : null}
            onClick={onToggleImageMode}>
            <span className="inner">
              <RiImageEditFill />
            </span>
          </button>
        </header>
      </BrowserRouter>
      <main>
        <div className="pdf-viewer-container">
          {Range(props.pdf.numPages).map(idx =>
            <AnnotatablePage
              key={idx}
              url={props.url}
              pdf={props.pdf}
              page={idx + 1}
              config={props.config}
              debug={debug}
              store={props.store}
              connections={props.connections}
              annotationMode={annotationMode}
              onCreateAnnotation={props.onCreateAnnotation}
              onUpdateAnnotation={props.onUpdateAnnotation}
              onDeleteAnnotation={props.onDeleteAnnotation}
              onCancelSelected={props.onCancelSelected} />
          )}
        </div>
      </main>
    </div>
  )

}

export default EndlessViewer;