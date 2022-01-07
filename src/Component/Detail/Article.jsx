import ReactMarkdown from 'react-markdown';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import Summary from './Summary';


const Help = (props) => {

  return (
    <div style={{color:'black'}}>
      <div className="nav-container">
        <MarkNav className="article-menu" source={props.md} headingTopOffset={80} updateHashAuto={false} ordered={true}/>
      </div> 
      <div className="article-container">
       <Summary time={props.time} view ={props.view} title={props.title} tags={props.tags}/>
      </div>
      <div className="article-container" style={{fontSize:'18px'}}>
        <ReactMarkdown escapeHtml={false} children={props.md}
        components={{img(props){
            return <img {...props} style={{ maxWidth: '100%'}} />
        }}}/>
      </div>
    </div>
  );
};
export default Help;