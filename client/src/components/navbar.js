import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "awesome-react-icons";
import { FiAirplay } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, language, lightbulb } from '@fortawesome/free-solid-svg-icons';
import { FaUniversity, FaLanguage } from 'react-icons/fa';
import { BsGraphUp, BsFillBriefcaseFill } from 'react-icons/bs';
import { BiCertification} from 'react-icons/bi';
import { AiOutlineSafetyCertificate, AiTwotoneThunderbolt } from 'react-icons/ai';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { FcIdea } from 'react-icons/fc';
import '../App.css';
import AddUser from './submit';


function Navbar() {
  return (
        <div className='container-fluid row'>
        <div class="col-sm-2">
        <div class="vertical-nav bg-white" id="sidebar">
        <div class=" mb-4 bg-light">
                <ul class="nav flex-column bg-white mb-0">
                        <li class="nav-item text-center">
                                <a href="/about" class="nav-link active text-dark font-italic bg-light ">
                                        <h2 class="m-0">AI Resume</h2>
                                        <p class="font-weight-light text-muted mb-0">Dashboard</p>   
                                </a>
                        </li>
                </ul>
        </div>

        <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item">
            <a href="/" class="nav-link text-dark font-italic bg-light">
                     <CgProfile className="mr-4" />Profile
            </a>
            </li>
            <li class="nav-item ">
                <a href="/about" class="nav-link text-dark font-italic bg-light ">
                    <FaUniversity className='mr-4' />Education
                </a>
            </li>
            <li class="nav-item">
            <a href="/services" class="nav-link text-dark font-italic bg-light">
              <RiLightbulbFlashLine className='mr-4' />Skills
            </a>
            </li>
            <li class="nav-item">
            <a href="/gallery" class="nav-link text-dark font-italic bg-light">
            <BsFillBriefcaseFill className='mr-4' />Experience
                    </a>
            </li>
        </ul>
        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item">
            <a href="/area" class="nav-link text-dark font-italic bg-light">
            <BsGraphUp className='mr-4' />Projects
                    </a>
            </li>
            <li class="nav-item">
            <a href="#" class="nav-link text-dark font-italic bg-light">
            <AiOutlineSafetyCertificate className='mr-4' />Certificates
                    </a>
            </li>
            <li class="nav-item">
            <a href="#" class="nav-link text-dark font-italic bg-light">
            <FaLanguage className='mr-4' />Languages
                    </a>
            </li>
            <li class="nav-item">
            <a href="#" class="nav-link text-dark font-italic bg-light">
            <BsGraphUp className='mr-4' />Interest
                    </a>
            </li>
            <li class="nav-item">
            <a href="#" class="nav-link text-dark font-italic bg-light">
            <AiTwotoneThunderbolt  className='mr-4' />More
                    </a>
            </li>
        </ul>
        </div>
    </div>
    <div className="col-sm-10">

    <AddUser>

    </AddUser>
  </div>
  </div>
  );
}

export default Navbar;
