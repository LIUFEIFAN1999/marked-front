import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import Summary from './Summary';

const Help = (props) => {

  const BlogImage = (props) => {
    return <img {...props} style={{ maxWidth: "100%" }} />
  }

const renderers = {
  //This custom renderer changes how images are rendered
  //we use it to constrain the max width of an image to its container
  //remarkPlugins={[[gfm, { singleTilde: false }]]}
  image: BlogImage,
  };

  return (
    <div style={{color:'black'}}>
      <div className="nav-container">
        <MarkNav className="article-menu" source={props.md} headingTopOffset={80} ordered={false} />
      </div> 
      <div className="article-container">
       <Summary time={props.time} view ={props.view} title={props.title} tags={props.tags}/>
      </div>
      <div className="article-container">
        
        <ReactMarkdown  allowDangerousHtml remarkPlugins={[[gfm, { singleTilde: false }]]}  escapeHtml={false} renderers={renderers} children={props.md}/>
          {/* {props.md}
        </ReactMarkdown> */}
      </div>
    </div>
  );
};
export default Help;