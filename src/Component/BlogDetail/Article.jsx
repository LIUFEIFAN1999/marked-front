import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import Summary from './Summary';

const Help = (props) => {


  return (
    <div style={{color:'black'}}>
      <div className="nav-container">
        <MarkNav className="article-menu" source={props.md} headingTopOffset={80} ordered={false} />
      </div> 
      <div className="article-container">
       <Summary time={props.time} view ={props.view} title={props.title} tags={props.tags}/>
      </div>
      <div className="article-container">
        <ReactMarkdown plugins={[[gfm, { singleTilde: false }]]}>
          {props.md}
        </ReactMarkdown>
      </div>
    </div>
  );
};
export default Help;