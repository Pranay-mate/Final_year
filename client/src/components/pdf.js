import React from 'react';
import Pdf from "react-to-pdf";
import './pdf.css'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Download from '@material-ui/icons/CloudDownload';


const ref = React.createRef();
const options = {
};
var pranay = 'Pranay';
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
        <h1>{props.pdfData.Profiles[0].Fname} {props.pdfData.Profiles[0].Mname} {props.pdfData.Profiles[0].Lname}</h1>
        <span class="subtitle">{props.pdfData.Profiles[0].JobTitle}</span>
      </header>
      <section class="main-block">
        <h2>
          <i class="fa fa-suitcase"></i> Experiences
        </h2>
        {/* {props.pdfData.Experiences[0].Title} */}
        {/* {props.pdfData.Experiences.map(({ experience }) =>
            <h1>{experienc}</h1>
        )} */}

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
              <div>
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec mi ante. Etiam odio eros, placerat eu metus id, gravida eleifend odio. Vestibulum dapibus pharetra odio, egestas ullamcorper ipsum congue ac. Maecenas viverra tortor eget convallis vestibulum. Donec pulvinar venenatis est, non sollicitudin metus laoreet sed. Fusce tincidunt felis nec neque aliquet porttitor</li>
                </ul>
                </div>
            </div>
          </section>
            
        )}
      </section>
      <section class="main-block">
        <h2>
          <i class="fa fa-folder-open"></i> Selected Projects
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
                <span class="place">Some workplace</span>
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
    </section>
    <aside id="sidebar">
      <div class="side-block" id="contact">
        <h1>
          Contact Info
        </h1>
        <ul>
          {/* <li><i class="fa fa-globe"></i> johndoe.gtld</li>
          <li><i class="fa fa-linkedin"></i> linkedin.com/in/john</li> */}
          
          {props.pdfData.Profiles[0].EmailId != null ? <li><i class="fa fa-envelope"></i> {props.pdfData.Profiles[0].EmailId}</li> : null}
          {props.pdfData.Profiles[0].ContactNumber != null ? <li><i class="fa fa-phone"></i> {props.pdfData.Profiles[0].ContactNumber}</li> : null}
        </ul>
      </div>
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