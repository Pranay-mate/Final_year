import React from 'react';
import Pdf from "react-to-pdf";
import './pdf.css'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Download from '@material-ui/icons/CloudDownload';


const ref = React.createRef();
const options = {
};


const PDF = (props) => {
  return (
    <>
      <div className="Post pdfDiv p-4" >
      {/* <div className="pdfDownload">
        <Pdf targetRef={ref} filename="post.pdf" style={{'position': 'fixed'}} options={options} x={2} y={1} scale={0.5}>
          {({ toPdf }) => <Button variant="contained" color="primary" startIcon={<Download />} onClick={toPdf} >Download</Button>}
        </Pdf>
      </div> */}
      <div class="portfolio" >
      <section id="main" >
      <header id="title">
        <h1>{typeof(props.pdfData.Profiles[0]) === 'undefined' ? null : props.pdfData.Profiles[0].Fname} {typeof(props.pdfData.Profiles[0]) === 'undefined' ? null : props.pdfData.Profiles[0].Mname} {typeof(props.pdfData.Profiles[0]) === 'undefined' ? null : props.pdfData.Profiles[0].Lname}</h1>
        <span class="subtitle">{typeof(props.pdfData.Profiles[0]) === 'undefined' ? null : props.pdfData.Profiles[0].JobTitle}</span>
      </header>
      <hr></hr>
      {props.pdfData.Experiences.length > 0 ?
      <>
      <h2><i class="fa fa-suitcase"></i> Experience </h2>
      <section class="main-block">
        {props.pdfData.Experiences.map(experience =>
          <section class="blocks">
            <div class="date">
              <span>{experience.SDate}</span> - <span>{experience.EDate}</span>
            </div>
            <div class="decorator">
            </div>
            <div class="details">
              <header>
                <h3>{experience.Title}</h3>
                <span class="place">{experience.WorkPlace}</span>
                <span class="location">{experience.WorkplaceAdd}</span>
              </header>
              {/* <div>
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec mi ante. Etiam odio eros, placerat eu metus id, gravida eleifend odio. Vestibulum dapibus pharetra odio, egestas ullamcorper ipsum congue ac. Maecenas viverra tortor eget convallis vestibulum. Donec pulvinar venenatis est, non sollicitudin metus laoreet sed. Fusce tincidunt felis nec neque aliquet porttitor</li>
                </ul>
                </div> */}
            </div>
          </section>
            
        )}
      </section>
      <hr></hr>

      </> : null}

      {props.pdfData.Projects.length > 0 ?
      <>
      <section class="main-block">
        <h2>
          <i class="fa fa-folder-open"></i> Projects
        </h2>
        {props.pdfData.Projects.map(project =>
          <section class="blocks">
            <div class="date">
              <span>{project.SDate}</span> - <span>{project.EDate}</span>
            </div>
            <div class="decorator">
            </div>
            <div class="details">
              <header>
                <h3>{project.ProjectName}</h3>
              </header>
              <div>
                <ul>
                  <li>{project.Description}</li>
                </ul>
              </div>
            </div>
          </section>
        )}
       
      </section>
      <hr></hr>
      </>: null}

      {props.pdfData.Educations.length > 0 ?
      <>
      <section class="main-block concise">
        <h2>
          <i class="fa fa-graduation-cap"></i> Education
        </h2>
        {props.pdfData.Educations.map(education =>
          <section class="blocks">
            <div class="date">
              <span>{education.SDate}</span> - <span>{education.EDate}</span>
            </div>
            <div class="decorator">
            </div>
            <div class="details">
              <header>
                <h3>{education.Program}</h3>
                <span class="place">{education.Institude}</span><br></br>
                <span class="location">Some City, Some Country</span>
              </header>
              <div>{education.MarksObtained}</div>
            </div>
          </section>
        )}
        
      </section>
    <hr></hr>
      </>: null}
    </section>
    <aside id="sidebar">
      <div class="side-block" id="contact" >
        <h1>
          Contact Info
        </h1>
        <ul>
          {/* <li><i class="fa fa-globe"></i> johndoe.gtld</li>
          <li><i class="fa fa-linkedin"></i> linkedin.com/in/john</li> */}
         
          {typeof(props.pdfData.Profiles) === 'undefined' ? null : <li><i class="fa fa-envelope"></i> {props.pdfData.Profiles[0].EmailId}</li> }
          {typeof(props.pdfData.Profiles)  === 'undefined' ? null : <li><i class="fa fa-phone"></i> {props.pdfData.Profiles[0].ContactNumber}</li> }
        </ul>
      </div>
      {props.pdfData.Skills.length > 0 ?
      <>
      <hr></hr>
      <div class="side-block" id="skills">
        <h1>
          Skills
        </h1>
        <ul>
        {props.pdfData.Skills.map(skill =>
          <li>{skill.skill}</li>
        )}
        </ul>
      </div>
      </>: null}
      <div class="side-block" id="disclaimer">
        {/* This r&eacute;sum&eacute; was wholly typeset with HTML/CSS &mdash; see <code>git.io/vVSYL</code> */}
      </div>
    </aside>
      </div>

      </div>
      
  </>    
  );
}

export default PDF;