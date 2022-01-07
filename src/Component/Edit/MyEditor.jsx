import { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from '@ckeditor/ckeditor5-build-custom';

export default class MyEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            characters:0,
            words:0,
        };
    }
   
    render() {
        return (
            <div style={{color:'black', fontSize:'15px'}}>
                <CKEditor
                    editor={ CustomEditor }
                    data="<h2>Edit your Blog！</h2><blockquote><p>使用以下功能来写博客</p></blockquote><p><code>Console.log('Hello World!')</code></p><p><a href='https://ckeditor.com'>https://ckeditor.com</a></p><p>最喜欢的事情：</p><ul><li>吃饭</li><li>睡觉</li><li>写代码</li></ul><p>大象放进冰箱的步骤：</p><ol><li>打开冰箱</li><li>把大象塞进冰箱</li><li>关闭冰箱</li></ol><p>今天的待办列表：</p><ul class='todo-list'><li><label class='todo-list__label'><input type='checkbox' disabled='disabled' checked='checked'><span class='todo-list__label__description'>PPT</span></label></li><li><label class='todo-list__label'><input type='checkbox' disabled='disabled' checked='checked'><span class='todo-list__label__description'>吃早饭</span></label></li><li><label class='todo-list__label'><input type='checkbox' disabled='disabled'><span class='todo-list__label__description'>背单词</span></label></li><li><label class='todo-list__label'><input type='checkbox' disabled='disabled'><span class='todo-list__label__description'>练口语</span></label></li><li><label class='todo-list__label'><input type='checkbox' disabled='disabled'><span class='todo-list__label__description'>答辩</span></label></li></ul><p>我的照片：</p><p><img src='https://33333.cdn.cke-cs.com/rc1DFuFpHqcR3Mah6y0e/images/23743e06c22b4c8862c948d08f447a3ac39c8114bfaf8a7e.jpg' srcset='https://33333.cdn.cke-cs.com/rc1DFuFpHqcR3Mah6y0e/images/23743e06c22b4c8862c948d08f447a3ac39c8114bfaf8a7e.jpg/w_100 100w, https://33333.cdn.cke-cs.com/rc1DFuFpHqcR3Mah6y0e/images/23743e06c22b4c8862c948d08f447a3ac39c8114bfaf8a7e.jpg/w_180 180w, https://33333.cdn.cke-cs.com/rc1DFuFpHqcR3Mah6y0e/images/23743e06c22b4c8862c948d08f447a3ac39c8114bfaf8a7e.jpg/w_260 260w, https://33333.cdn.cke-cs.com/rc1DFuFpHqcR3Mah6y0e/images/23743e06c22b4c8862c948d08f447a3ac39c8114bfaf8a7e.jpg/w_340 340w, https://33333.cdn.cke-cs.com/rc1DFuFpHqcR3Mah6y0e/images/23743e06c22b4c8862c948d08f447a3ac39c8114bfaf8a7e.jpg/w_420 420w, https://33333.cdn.cke-cs.com/rc1DFuFpHqcR3Mah6y0e/images/23743e06c22b4c8862c948d08f447a3ac39c8114bfaf8a7e.jpg/w_500 500w' sizes='100vw' width='500'></p>代码段：<pre><code class='language-javascript'>ClassicEditor
                    .create( document.querySelector( '#editor' ), {
                        plugins: [ WordCount, ... ],
                        wordCount: {
                            onUpdate: stats =&gt; {
                                // Prints the current content statistics.
                                console.log( `Characters: ${ stats.characters }\nWords: ${ stats.words }` );
                            }
                        }
                    } )
                    .then( ... )
                    .catch( ... );</code></pre>"
                    onReady={ editor => {
                        // You can store the 'editor' and use when it is needed.
                        console.log( 'Editor is ready to use!');
                    } }
                    onChange={ ( event, editor ) => {

                    } }
                    onBlur={ ( event, editor ) => {
                        const data = editor.getData();
                        this.props.onChange(data)
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                    config={
                        {
                            cloudServices: {
                                tokenUrl: 'https://85549.cke-cs.com/token/dev/6627982bd931de981b4178b97aef06f46f40f961e55e808b5fc80ff85a18',
                                uploadUrl: 'https://85549.cke-cs.com/easyimage/upload/'
                            },
                            wordCount: {
                                onUpdate: stats => {
                                    // Prints the current content statistics.
                                    this.setState({
                                        characters:stats.characters,
                                        words:stats.words,
                                    })
                                }
                            },
                            
                        }
                    }
                />
                <div style={{paddingTop:6, paddingRight:8, textAlign:'right', height:25,backgroundColor:'#FAFAFA', borderLeft:'1px solid', borderRight:'1px solid', borderBottom:'1px solid', borderColor:'#C4C4C4'}}>
                    {`Characters: ${ this.state.characters }  Words: ${ this.state.words }`}
                </div>
            </div>
        )
    }
}


