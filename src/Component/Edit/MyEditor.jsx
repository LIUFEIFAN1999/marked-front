import { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class MyEditor extends Component {
   
    render() {
        return (
            <div style={{color:"black"}}>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Edit your Blog!</p><br><br><br><br><br><br><br><br><br><br>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!');
                    } }
                    onChange={ ( event, editor ) => {
                        // const data = editor.getData();
                        // this.props.onChange(data)
                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                        const data = editor.getData();
                        this.props.onChange(data)
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                    config={
                        {
                            cloudServices: {
                                tokenUrl: 'https://85549.cke-cs.com/token/dev/c1bcd759dca6728705d57b5717afa0dc60c5caf44754aeebe7d09afb6f5b',
                                uploadUrl: 'https://85549.cke-cs.com/easyimage/upload/'
                            },
                        }
                    }
                />
            </div>
        )
    }
}
